// import React,{useEffect , useReducer} from 'react'
import {useParams} from "react-router-dom";
import Details from '../components/show/Details';
import ShowMainData from '../components/show/ShowMainData';
// import { apiGet } from '../misc/config';
import Seasons from '../components/show/Seasons';
import Cast from '../components/show/Cast';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import {useShow} from '../misc/custom-hooks'


// const reducer = (prevstate , action) =>{
//     switch(action.type){
//         case 'FETCH_SUCCESS':{
//             return{isLoading:false , error: null , show :action.show};
//         }

//         case 'FETCH_FAILED':{
//             return{...prevstate,isLoading:false , error: action.error}
//         }

//         default: return prevstate;
//     }
// }

// const initialState = {
//     show:null,
//     isLoading:true,
//     error:null
// }

function Show() {

    const {id} = useParams();

    const {show , isLoading , error} = useShow(id);
    //  const [show, setshow] = useState(null);
    //  const [isLoading, setisLoading] = useState(true);
    //  const [error, seterror] = useState(null)
    
    // const[{show , isLoading , error} , dispatch] = useReducer(reducer , initialState );

    // useEffect(()=>{

    //     let isMounted=true;

    //    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results =>{
               
    //     setTimeout(()=>{
    //         if(isMounted)
    //         {
    //             dispatch({type:"FETCH_SUCCESS" , show:results})
    //             // setshow(results);
    //             // setisLoading(false);
    //         }
    //     },2000)

    //    }).catch(err=>{
    //     if(isMounted)
    //     {
    //         dispatch({type:"FETCH_FAILED" , error:err.message})
    //     //  seterror(err.message);
    //     // setisLoading(false);
    //     }
    //    });

    //    return ()=>{
    //     isMounted=false;
    //    }
    // }, [id])

    if(isLoading)
    {
        return <div>data is being loaded</div>
    }
    if(error)
    {
        return <div>error occured :{error}</div>
    }

  return (
    <ShowPageWrapper>
      <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres}/>
      <InfoBlock>
        <h2>Details</h2>
        <Details status={show.status} network={show.network} premiered={show.premiered} />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons}/>
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast}/>
      </InfoBlock>

    </ShowPageWrapper>
  )
}

export default Show
