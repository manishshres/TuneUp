// Import the axios library
import axios from "axios";

// Get the RapidAPI key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY_2;

// Set the base URL for the Spotify API
const BASE_URL = "https://spotify23.p.rapidapi.com";

// Function to search for songs based on a query
export const searchSongs = async (searchTerm) => {
  try {
    // Make a GET request to the Spotify API with the search query
    const response = await axios.get(`${BASE_URL}/search/`, {
      params: {
        q: `${searchTerm}`,
        type: "multi",
        offset: "0",
        limit: "6",
        numberOfTopResults: "6",
      },
      // Set the headers for the RapidAPI key and host
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    });
    // Format the search results and return them
    const result = {
      success: true,
      artists: response.data.artists.items,
      songs: response.data.tracks.items,
    };
    return result;
  } catch (error) {
    // Log any errors and display an alert
    console.log(error);
    alert("Error fetching data");
  }
};

// Function to fetch artist data from RapidAPI using axios
// Takes in the artist's uid as an argument
export const getArtistData = async (artistId) => {
  try {
    // Make a GET request to the Spotify23 API to fetch data for the given artist ID
    const response = await axios.get(`${BASE_URL}/artist_overview/`, {
      params: {
        id: `${artistId}`,
      },
      // Set the headers for the RapidAPI key and host
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    });
    // Set the fetched data to the "query" state variable
    return response.data.data.artist;
  } catch (error) {
    // Log any errors and display an alert
    console.log(error);
    alert("Error fetching data");
  }
};
