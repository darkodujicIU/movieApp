import * as sortedTypes from "../actions/sorted/sortedTypes";
//Initial state of sorted movies
const initialState = {
  sorted: [],
  loading: false,
  error: false,
};

//Specifing how state gets updated with each aadditional step, then receiving data and stopping loading phase if data has been fetched succesfully to our Array.
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case sortedTypes.SORTED_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case sortedTypes.SORTED_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        sorted: action.Sorted,
      };
    }

    case sortedTypes.SORTED_ERROR: {
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
