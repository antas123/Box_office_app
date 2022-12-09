import React , {useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from "../misc/config";
import { useLastQuery } from '../misc/custom-hooks';
import { SearchButtonWrapper, SearchInput } from './Home.styled';
import {RadioInputsWrapper} from './Home.styled';

function Home() {

  const [Input, setInput] = useLastQuery();
  const [results ,  setResults] = useState(null);
  const [searchOption, setsearchOption] = useState('shows')


  const isShowsearch = searchOption === "shows";

  const onRadioChange=(ev)=>{
   setsearchOption(ev.target.value);
  }

  const onInputchange =(ev)=>{
     setInput(ev.target.value);
  }

  const onSearch = ()=>{
    // https://api.tvmaze.com/search/shows?q=men
    apiGet(`/search/${searchOption}?q=${Input}`).then(result=>{
      setResults(result);
      // console.log(result);
    })
   
  };

  const onEnterKey=(ev)=>{
    if(ev.keyCode===13)
    {
        onSearch();
    }
  }

  const renderResults=()=>{

    if(results && results.length===0)
    {
         return <div>no results</div>
    }
    if(results && results.length>0)
    {
         return (results[0].show ?  <ShowGrid data={results} /> : <ActorGrid data={results} />
            // results.map((item)=> <div key={item.show.id}>{item.show.name}</div> )
           
            // :results.map((item)=> <div key={item.person.id}>{item.person.name}</div> ) )
          
         ) ;
    };

    return null;

  }

  
  return (
    <MainPageLayout>
     <SearchInput placeholder='search shows or actors' type="text" onChange={onInputchange} onKeyDown={onEnterKey} value={Input} />

     <RadioInputsWrapper>
     <div>
      
      <CustomRadio 
       label="Shows"
       id='show-search'
       value="shows" 
       checked={isShowsearch}
       onChange={onRadioChange}
      />
     </div>

      <div>
      <CustomRadio 
       label="Actors"
       id='actor-search' 
       value="people" 
       checked={!isShowsearch} 
       onChange={onRadioChange}
      />
      </div>
     </RadioInputsWrapper>


     <SearchButtonWrapper>
     <button type="button" onClick={onSearch} >Search</button>
     </SearchButtonWrapper>
     {renderResults()}
    </MainPageLayout>
  )
}

export default Home
