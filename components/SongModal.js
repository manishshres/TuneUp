import React from "react";
import AudioPlayer from "./AudioPlayer";

function SongModal({ showModal, toggleModal, url, lyricsData }) {
  const rest = url;
  // If showModal is false, return nothing
  if (!showModal) {
    return null;
  }

  const msToTime = (time) => {
    const date = new Date(time);
    return `${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    // Create a fixed div that covers the entire screen
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      {/* Create an absolute div that covers the entire screen with a semi-transparent gray background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50 "></div>
      {url ? (
        <div
          key={1}
          className="bg-white rounded-lg max-w-2xl p-8 z-50 mb-2 overflow-y-auto"
        >
          {/* Log the value of the url variable to the console */}

          <h2 className="text-3xl font-bold mb-4">{url[0].name}</h2>

          <div className="border border-gray-300 p-2 rounded-md flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
              {/* Display an image, with a fallback image if the URL is not valid */}
              <img
                src={url[0].album?.images[1]?.url ?? "/image.jpg"}
                alt={url[0].name}
                className="object-cover object-center w-full h-auto rounded-md"
              />
            </div>
            <div className="md:w-1/3">
              <h2 className="text-left text-lg font-bold mb-1">Duration:</h2>
              {/* Display the artist's biography, with ellipses if it exceeds 245 characters */}
              <p className="text-left">{msToTime(url[0]?.duration_ms)}</p>

              {url[0].is_playable && url[0]?.preview_url && (
                <AudioPlayer
                  className="item-left"
                  musicUrl={url[0]?.preview_url}
                />
              )}
            </div>

            <div className="md:w-1/3">
              <h2 className="text-left text-lg font-bold mb-1">Artists:</h2>
              {/* Display the artist's biography, with ellipses if it exceeds 245 characters */}
              <ul className="text-left">
                {url[0].artists.map((artist) => (
                  <li>{artist.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-left text-lg font-bold mt-2">Lyrics: </h2>
            <div class="h-64 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
              <div class="h-300 text-left ">
                {lyricsData && lyricsData.lyrics.lines && (
                  <ul className="p-4">
                    {lyricsData.lyrics.lines.map((line, i) => (
                      <li key={i}>{line.words}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Display a "Close" button that triggers the toggleModal function */}
          <button
            onClick={() => toggleModal()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Close
          </button>
        </div>
      ) : (
        // Display a loading message if the url variable is null
        <div className="bg-white m-auto center rounded-lg p-8 z-50">
          <img class="mx-auto" src="loading.gif" />
          <h1 className="text-center text-md font-bold mb-4">Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default SongModal;
