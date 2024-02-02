// AudioPlayer.jsx
import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ playlist, currentTrack, onSelectTrack, onTrackEnded }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.play();
    }
  }, [currentTrack]);

  return (
    <div className="audio-player">
      <audio ref={audioRef} controls onEnded={onTrackEnded} />
    </div>
  );
};

export default AudioPlayer;




