import { useReducer, useEffect , useState} from "react";
import { apiGet } from '../misc/config';

function showsReducer(prevState, action) {
    switch(action.type) {
        case 'ADD': {
            return [...prevState,action.showId];
        }
        case 'REMOVE': {
            return prevState.filter(showID => showID !== action.showId);
        }
        default:
            return prevState;
    }
}

function usePersistedReducer (reducer,initialState,key) {
    const [state,dispatch] = useReducer(reducer, initialState, initial => {
        const persisted = localStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(state));
    }, [state,key]);

    return [state, dispatch];
}






export function useShows(key = 'shows') {
    return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery'){

    const [Input, setInput] = useState( ()=>{
        const persisted = sessionStorage.getItem(key);

        return persisted ? JSON.parse(persisted) :"";
    });

    const setPersistedInput = newState =>{
        setInput(newState);
        sessionStorage.setItem(key , JSON.stringify(newState));
    };

    return [Input , setPersistedInput];
}










const reducer = (prevstate , action) =>{
    switch(action.type){
        case 'FETCH_SUCCESS':{
            return{isLoading:false , error: null , show :action.show};
        }

        case 'FETCH_FAILED':{
            return{...prevstate,isLoading:false , error: action.error}
        }

        default: return prevstate;
    }
}



export function useShow(showId){


    const[state , dispatch] = useReducer(
        reducer ,
        {
            show:null,
            isLoading:true,
            error:null
        }
         );

    useEffect(()=>{

        let isMounted=true;

       apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`).then(results =>{
               
        setTimeout(()=>{
            if(isMounted)
            {
                dispatch({type:"FETCH_SUCCESS" , show:results})
                // setshow(results);
                // setisLoading(false);
            }
        },2000)

       }).catch(err=>{
        if(isMounted)
        {
            dispatch({type:"FETCH_FAILED" , error:err.message})
        //  seterror(err.message);
        // setisLoading(false);
        }
       });

       return ()=>{
        isMounted=false;
       }
    }, [showId]);

    return state;
}