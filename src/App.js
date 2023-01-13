import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./data/data.json";

const moviesArray = data.movies;

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [topMovies, setTopMovies] = useState([]);

  const handleChange = (e) => {
    if (e.target.value.length >= 3) {
      setTopMovies([]);
      setSelectedGenre("");
      setSearchQuery(e.target.value);
      searchMovie(e.target.value);
    } else {
      setTopMovies([]);
      setSelectedGenre("");
      setSearchQuery("");
    }
  };

  const searchMovie = async (_query) => {
    let responseArray = [];
    moviesArray.forEach((movie) => {
      // The Found Variable is used to avoid any duplication of Movie incase the same movie as multiple genres mathcing the same search query.
      let found = false;
      movie.genres.forEach((genre) => {
        if (genre.toLowerCase().includes(_query.toLowerCase()) & !found) {
          // if(genre.toLowerCase()===_query.toLowerCase() )
          found = true;
          setSelectedGenre(genre);
          responseArray.push({
            name: movie.name,
            rating: movie.rating,
            genreCount: movie.genres.length,
          });
        }
      });
    });
    responseArray.sort(compare);
    if (responseArray.length > 3) {
      responseArray = responseArray.slice(0, 3);
    }

    setTopMovies(responseArray);
  };

  const compare = (b, a) => {
    if (a.genreCount < b.genreCount) {
      return -1;
    }
    if (a.genreCount > b.genreCount) {
      return 1;
    }
    return 0;
  };

  return (
    <div className='App'>
      <h2>Movie Search</h2>
      <input onChange={handleChange} />
      <div className='container'>
        {topMovies.length ? (
          <div className='result-box'>
            <span>
              <div className='result-title'>Genre : {selectedGenre} </div>{" "}
            </span>
            <table className='result-table'>
              {topMovies.map((movie, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{movie.name}</td>
                    <td>{movie.rating}⭐</td>
                  </tr>
                 );
              })}
            </table>

            <span>
              <div className='result-footer'>
                {" "}
                {topMovies.length < 3
                  ? `Found Only ${topMovies.length} ${
                      topMovies.length === 1 ? "Match" : "Matches"
                    }`
                  : null}{" "}
              </div>
            </span>
          </div>
        ) : (
          <div>
            {searchQuery.length >= 3 ? (
              <h4>No Match Found</h4>
            ) : (
              <h4>Enter Genre to Search</h4>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
