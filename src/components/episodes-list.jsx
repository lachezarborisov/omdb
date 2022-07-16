import React from 'react';

const EpisodesList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  console.log('DEBUG props: ', props.episodes);

  return (
    <div className='cards-list'>
      { props ? props.episodes.map((episode) => (
        <div className='card' key={episode.imdbID}>
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
      )) : null }
    </div>
  );
};

export default EpisodesList;