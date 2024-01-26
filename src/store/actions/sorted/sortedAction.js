import * as sortedType from "./sortedTypes";
import axios from "axios";

//Defining start action of sorting movies with a reusable type
export const SORTED_START = () => {
  return {
    type: sortedType.SORTED_START,
  };
};

//Defining success action of sorting movies with a reusable type with a parameter of Sorted data that will be later fetched
export const SORTED_SUCCESS = (Sorted) => {
  return {
    type: sortedType.SORTED_SUCCESS,
    Sorted: Sorted,
  };
};

//Defining error action of sorting movies with a reusable type
export const SORTED_ERROR = (error) => {
  return {
    type: sortedType.SORTED_ERROR,
    error: error,
  };
};

//Fetching movies based on pageNumber and genre
export const SORTED_FETCH = (pageNumber, genreId) => {
  return (dispatch) => {
    //Starting action of fetching
    dispatch(SORTED_START());

    let key = "a1e70815ed514d294dc936b2f74a2ef3";

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=2024-07-20&vote_average.gte=6&with_genres=${genreId}&page=${pageNumber}`
      )
      .then((res) => {
        let fetchMovies = [];
        const results = res.data.results;
        results.forEach((el) => {
          el.imageCreate =
            "https://image.tmdb.org/t/p/original" + el.backdrop_path;

          fetchMovies.push(el);
        });

        fetchMovies.splice(1, 10);
        //Succesfully fetched movies using TMDB API and my api key from any given pageNumber and genre. Then succesfully storing that data and dispatching success action.

        dispatch(SORTED_SUCCESS(fetchMovies));
      })
      .catch((error) => {
        //Fetching failure and dispatching error function
        dispatch(SORTED_ERROR(error.message));
      });
  };
};
