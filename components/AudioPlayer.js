import React, { useState, useRef } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

function AudioPlayer({ musicUrl }) {
  // Create a reference to the <audio> element
  const audioRef = useRef(null);

  // Create a state variable to keep track of whether the audio is currently playing or paused
  const [isPlaying, setIsPlaying] = useState(false);

  // Define a function to toggle between playing and paused
  const togglePlay = () => {
    if (isPlaying) {
      // If the audio is currently playing, pause it
      audioRef.current.pause();
    } else {
      // If the audio is currently paused, play it
      audioRef.current.play();
    }
    // Update the state variable to reflect the new state
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      {/* Create an <audio> element with the provided music URL, and attach the ref to the audioRef variable */}
      <audio src={musicUrl} ref={audioRef} />
      {/* Create a button that toggles between playing and paused when clicked */}
      <button
        onClick={togglePlay}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded rounded-full"
      >
        {isPlaying ? (
          <PlayIcon className="h-6 w-6 text-white" />
        ) : (
          <PauseIcon className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
}

export default AudioPlayer;
