import React from 'react'
import ActorCard from './ActorCard'
import IMAGE_NT_FOUND from "../images/not-found.png";
import { FlexGrid } from '../styled';
function ActorGrid({data}) {
  return (
    <FlexGrid>
      {data.map(({person})=> <ActorCard 
        key={person.id}
        name={person.name}
        country={person.country ? person.country.name : null}
        birthday={person.birthday}
        deathday={person.deathday}
        image={person.image ? person.image.medium : IMAGE_NT_FOUND}
      />
      
      )}
    </FlexGrid>
  )
}

export default ActorGrid
