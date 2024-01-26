import * as actionTypes from "../actions/actionTypes";

//Creating initial state of potential fetched movies
const initialState = {
  movies: [],
  loading: false,
  error: false,
};

//Specifing how state gets updated from starting phase during fetching using API to receiving and storing fetched data in our movies Array.
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVIE_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case actionTypes.MOVIE_SUCCESS: {
      return {
        movies: action.Movies,
        loading: false,
        error: false,
      };
    }

    case actionTypes.MOVIE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export default reducer;
