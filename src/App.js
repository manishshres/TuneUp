import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  
  const[loading, setLoading] = useState(false);
  const[searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const API_KEY=process.env.REACT_APP_API_KEY



  const handleSearch = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('https://spotify23.p.rapidapi.com/search/', {
        params: {
          q: searchTerm,
          type: 'multi',
          offset: '0',
          limit: '5',
          numberOfTopResults: '5'
        },
          headers: {
    'X-RapidAPI-Key': `${API_KEY}`,
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
      });
      setArtists(response.data.artists.items);
      console.log(artists)
      setSongs(response.data.tracks.items);
      console.log(songs)
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
     <div>
      <form className="search-form" onSubmit={handleSearch}>
        <input className="search-input" type="text" name="search" value={searchTerm} required
          onChange={event => setSearchTerm(event.target.value)}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      {songs && songs.length ? (
        
        <div className="results-container">
          <h1>Songs</h1>
          {songs.map((song) => (
            <div className="song-container" key={song.data.id}>
            <img src={song.data.albumOfTrack.coverArt.sources[0].url} alt="Cover Art" className="cover-art"/>
            <div className="song-info" >
                <p className="song-name">{song.data.name}</p>
                <p className="artist-name">{song.data.artists.items[0].profile.name}</p>
                <p className="duration">{song.data.duration.totalMilliseconds}</p>
            </div>
        </div>
          ))}
        </div>
      ) : (
        <div className="no-results">No results found</div>
      )}

      {artists && artists.length ? (
        
        <div className="results-container">
          <h1>Artists</h1>
          {artists.map((artist) => (
            <div className="song-container" key={artist.data.profile.uri} >
            <img src={artist.data.visuals.avatarImage.sources[1].url} alt="Cover Art" className="cover-art"/>
            <div className="song-info">
                <p className="song-name">{artist.data.profile.name}</p>
            </div>
        </div>

          ))}
        </div>
      ) : (
        <div className="no-results">No results found</div>
      )}

    </div>
    </div>
  );
}

export default App;
