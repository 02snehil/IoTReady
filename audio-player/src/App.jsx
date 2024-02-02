// App.jsx
import React, { useEffect, useState } from 'react';
import AudioPlayer from './components/AudioPlayer';
import NowPlaying from './components/NowPlaying';
import Playlist from './components/Playlist';
import Upload from './components/Upload';
import './App.css';

function App() {
  const initialTrack = {
    title: 'SoundHelix Song',
    artist: 'Unknown',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 0,
    currentTime: 0,
  };
 
  const [playlist, setPlaylist] = useState([initialTrack]);

  const [currentTrack, setCurrentTrack] = useState(() => {
    const storedCurrentTrack = localStorage.getItem('currentTrack');
    const storedCurrentTime = localStorage.getItem('currentTime');

    if (!storedCurrentTrack || !storedCurrentTime) {
      // If there's no stored current track, set the initial track as the current track
      return initialTrack;
    }

    return {
      title: storedCurrentTrack,
      artist: 'Unknown',
      src: storedCurrentTrack,
      duration: 0,
      currentTime: parseFloat(storedCurrentTime),
    };
  });

  useEffect(() => {
    // Clear the playlist when the component mounts (on initial load)
    setPlaylist([initialTrack]);

    // Retrieve and set the playlist from localStorage (if available)
    const storedPlaylist = localStorage.getItem('playlist');
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    }
  }, []); // Empty dependency array to ensure it runs only on mount

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const handleSelectTrack = (track) => {
    setCurrentTrack(track);
  };

  const handleTrackEnded = () => {
    const nextTrack = playlist[playlist.indexOf(currentTrack) + 1];
    if (nextTrack) {
      setCurrentTrack(nextTrack);
    } else {
      setCurrentTrack(null);
    }
  };
  
  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
  };

  const handleDeleteTrack = (trackToDelete) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((track) => track.src !== trackToDelete.src));
  };

  const handleUpload = (files) => {
    const newTracks = files.map(file => ({
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Unknown",
      src: URL.createObjectURL(file),
      file: file,
    }));

    setPlaylist([initialTrack, ...newTracks]);
  };

  return (
    <div className="App">
      <h1>React Audio Player</h1>
      <Upload onDrop={handleUpload} />
      <NowPlaying currentTrack={currentTrack} />
      <AudioPlayer
        playlist={playlist}
        currentTrack={currentTrack}
        onSelectTrack={handleSelectTrack}
        onTrackEnded={handleTrackEnded}
      />
      <Playlist
        playlist={playlist}
        onSelectTrack={handleSelectTrack}
        onDeleteTrack={handleDeleteTrack}  
        onPlayTrack={handlePlayTrack}
      />
    </div>
  );
}

export default App;
