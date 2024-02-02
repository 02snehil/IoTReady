// Playlist.jsx
import React from 'react';

const Playlist = ({ playlist, onSelectTrack, onDeleteTrack, onPlayTrack }) => {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index}>
            <div>
              <button onClick={() => onSelectTrack(track)}>
                {track.title} - {track.artist}
              </button>
            </div>
            <div>  
              <button onClick={() => onPlayTrack(track)}>
              Play
            </button> &nbsp;
              <button onClick={() => onDeleteTrack(track)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;








