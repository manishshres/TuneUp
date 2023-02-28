import React, { useState, useEffect } from "react";

function ArtistModal({ showModal, toggleModal, url }) {
  const rest = url;
  // If showModal is false, return nothing
  if (!showModal) {
    return null;
  }

  return (
    // Create a fixed div that covers the entire screen
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      {/* Create an absolute div that covers the entire screen with a semi-transparent gray background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50 "></div>
      {url ? (
        <div
          key={url.id}
          className="bg-white rounded-lg max-w-2xl p-8 z-50 mb-2 overflow-y-auto"
        >
          {/* Log the value of the url variable to the console */}

          <h2 className="text-3xl font-bold mb-4">{url.profile.name}</h2>
          <div className="border border-gray-300 p-2 rounded-md flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
              {/* Display an image, with a fallback image if the URL is not valid */}
              <img
                src={url.visuals.avatarImage?.sources?.[0]?.url ?? "/image.jpg"}
                alt={url.profile.name}
                className="object-cover object-center w-full h-auto rounded-md"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-left text-lg font-bold mb-1">Biography :</h2>
              {/* Display the artist's biography, with ellipses if it exceeds 245 characters */}
              <p className="text-left">
                {url.profile.biography?.text &&
                url.profile.biography?.text.length > 245
                  ? url.profile.biography.text.slice(0, 245) + "..."
                  : url.profile.biography.text}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-left text-lg font-bold mt-2 mb-2">
              Popular Releases:{" "}
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {/* Display the top 4 album from artist */}
              {url?.discography?.popularReleases?.items
                .slice(0, 10)
                .map((item, i) => (
                  <div className="border border-gray-300 p-4 rounded-md flex flex-col md:flex-row">
                    <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                      <img
                        src={item?.releases?.items[0]?.coverArt?.sources[1].url}
                        className="object-cover object-center w-full h-auto rounded-md"
                      />
                      <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 mt-1">
                        {item?.releases?.items[0].type}
                      </span>
                    </div>
                    <div className="md:w-2/3">
                      <h2 className="font-bold text-md">
                        {item?.releases?.items[0].name}
                      </h2>

                      <p>
                        Released: {item?.releases?.items[0].date?.year} <br />
                        Total Tracks:{" "}
                        {item?.releases?.items[0].tracks?.totalCount}{" "}
                      </p>
                    </div>
                  </div>
                ))}
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

export default ArtistModal;
