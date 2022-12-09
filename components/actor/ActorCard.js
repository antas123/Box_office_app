import React from 'react'
import { StyledActorCard } from './ActorsCard.styled';

// ActorCard.js

const ActorCard = ({ image, name, country, birthday, deathday }) => {
    return (
      <StyledActorCard>
        <div className='img-wrapper'>
          <img src={image} alt="actor" />
        </div>
        <h1>
          {name} 
           
        </h1>
        <p>{country ? `Comes from ${country}` : 'No country known'}</p>
        {birthday ? <p>Born {birthday}</p> : null}
        <p className='deathday'>{deathday ? `Died ${deathday}` : 'Alive'}</p>
      </StyledActorCard>
    );
  };

export default ActorCard
