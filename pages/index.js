import { useState } from "react";
import Head from "next/head";
import SongModal from "@/components/SongModal";
import ArtistModal from "@/components/ArtistModal";
import { searchSongs, getArtistData } from "@/pages/api/spotify";

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const [showSongModal, setshowSongModal] = useState(false);
  const [showArtistModal, setshowArtistModal] = useState(false);

  const toggleMusicModal = (data) => {
    setQuery(data);
    setshowSongModal(!showSongModal);
  };
  const toggleArtistModal = async (data) => {
    const result = await getArtistData(data);
    setQuery(result);
    setshowArtistModal(!showArtistModal);
  };

  const handleShowShowMore = (song) => {
    setSelectedSong(song);
  };

  const handleSongCloseModal = () => {
    setSelectedSong(null);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = async (event) => {
    event.preventDefault();
    if (searchInput.trim() !== "") {
      const result = await searchSongs(searchInput);
      setSearchResults(result);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Food Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl text-blue-700 font-bold mb-8">Tune Up</h1>
        <form
          onSubmit={handleSearchClick}
          className="flex items-center w-full mb-8"
        >
          <input
            className="border border-gray-400 py-2 px-4 w-full rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search songs or artists"
            value={searchInput}
            onChange={handleInputChange}
          />
          <button
            className={`ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 ${
              searchInput.trim() === "" && "cursor-not-allowed opacity-50"
            }`}
            type="submit"
            disabled={searchInput.trim() === ""}
          >
            Search
          </button>
        </form>
        {searchResults && (
          <>
            <ArtistModal
              showModal={showArtistModal}
              toggleModal={toggleArtistModal}
              url={query}
            />
            <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mt-8">
              {searchResults.artists.map((artist, i) => (
                <>
                  <div
                    key={artist.data.uri}
                    className="border border-gray-300 p-4 rounded-md flex flex-col md:flex-row"
                  >
                    <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                      {/* {console.log(artist.data.visuals)} */}
                      <img
                        src={
                          artist.data.visuals.avatarImage !== null
                            ? artist.data.visuals.avatarImage.sources[0].url
                            : "/image.jpg"
                        }
                        alt={artist.data.profile.name}
                        className="object-cover object-center w-full h-auto rounded-md"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h2 className="font-bold mb-2">
                        {artist.data.profile.name}
                      </h2>
                      <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded text-green-600 bg-green-200 uppercase last:mr-0 mr-1">
                        Artist
                      </span>
                      <p></p>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() =>
                          toggleArtistModal(artist.data.uri.split(":").pop())
                        }
                      >
                        Show More Info
                      </button>
                    </div>
                  </div>
                </>
              ))}
              {searchResults.songs.map((song) => (
                <>
                  <SongModal
                    showModal={showSongModal}
                    toggleModal={toggleMusicModal}
                    url={query}
                  />
                  <div
                    key={song.data.id}
                    className="border border-gray-300 p-4 rounded-md flex flex-col md:flex-row"
                  >
                    <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                      <img
                        src={song.data.albumOfTrack.coverArt.sources[0].url}
                        alt={song.data.name}
                        className="object-cover object-center w-full h-auto rounded-md"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h2 className="font-bold mb-2">{song.data.name} </h2>
                      <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1">
                        Song
                      </span>
                      <p>{song.data.uri.split}</p>

                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() =>
                          toggleMusicModal(song.data.uri.split(":").pop())
                        }
                      >
                        Show More Info
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://github.com/username"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
