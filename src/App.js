import React, { useEffect, useState, useRef, useCallback } from 'react';

import Heading from './components/heading';
import Search from './components/search';
import EpisodesList from './components/episodes-list';
import AddFavourite from './components/add-favourite';
import RemoveFavourite from './components/remove-favourite'
import './App.css';

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourite, setFavourite] = useState([]);
  let page = 1;
  
  const getEpisodes = async (searchValue) => {
    let url = '';

    if(searchValue) {
      url = `https://www.omdbapi.com/?apikey=b63274f8&s=${searchValue}`;
    } else {
      url = `https://www.omdbapi.com/?apikey=b63274f8&s=Game of Thrones&page=${page}`;
      page++;
    }

    const res = await fetch(url);
    const resJson = await res.json();

    if (resJson.Search) {
      const result = searchValue 
                   ? resJson.Search 
                   : (oldEpisodes) => [...oldEpisodes, ...resJson.Search]
      setEpisodes(result);      
    }
  }

  const handleScroll = (e) => {
    if (window.innerHeight + e.target.documentElement.scrollTop >= e.target.documentElement.scrollHeight) {
      getEpisodes();
    }
  }

  useEffect(() => {
    getEpisodes(searchValue);
    if (!searchValue) {
      window.addEventListener('scroll', handleScroll);      
    }
  }, [searchValue]);

  useEffect(() => {
    const episodesFovourite = JSON.parse(localStorage.getItem('favourite-episodes'));
    setFavourite(episodesFovourite);
    saveToLocalStorage([]);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('favourite-episodes', JSON.stringify(items));
  }

  const addFavouriteEpisode = (episode) => {
    const newFavouriteList = [...favourite, episode];
    setFavourite(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteEpisode = (episode) => {
    const newFavouriteList = favourite.filter((f) => f.imdbID !== episode.imdbID)
    setFavourite(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className="container">
      <h1>Game of Thrones</h1>
      <div>
        <Heading heading={'Favourites'} />        
        <EpisodesList 
          episodes={favourite} 
          favouriteClick={removeFavouriteEpisode} 
          favouriteComponent={RemoveFavourite} 
          fav={'fav'} />
      </div>    
      <Heading heading={'Episodes'} />
      <Search 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} />
      <EpisodesList 
        episodes={episodes} 
        favouriteClick={addFavouriteEpisode} 
        favouriteComponent={AddFavourite} />
    </div>
  );
};

export default App;
