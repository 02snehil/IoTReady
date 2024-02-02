// NowPlaying.jsx
import React from 'react';

const NowPlaying = ({ currentTrack }) => {
  return (
    <div className="now-playing">
      {currentTrack && (
        <>
          <h2>{currentTrack.title}</h2>
        </>
      )}
    </div>
  );
};

export default NowPlaying;
