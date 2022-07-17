import React from 'react';

const EpisodesList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <div className='cards-list'>
      {props.episodes.map((episode, index) => (
        <div className='card' key={index}>
          <div className='card-img'>
            <img src={episode.Poster}  alt="episode" />
          </div>
          <div className='card-info'>
            <div>
              <h5>{episode.Title}</h5>
              <p>Year: {episode.Year}</p>
            </div>
            <div onClick={() => props.favouriteClick(episode)}>
              <FavouriteComponent />
            </div>      
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodesList;