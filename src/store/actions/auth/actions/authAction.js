import * as actionTypes from "./authTypes";
import axios from "axios";

//Creating and exporting authentification actions for use in our reducer.

export const AUTH_START = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
//Removing our identification token and expiration date from local storage when clicking logout button
export const LOAGOUT = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOAGOUT,
  };
};

export const AUTH_SUCCESS = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: authData,
  };
};

export const AUTH_FAIL = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
//Dispatching invoked Logout action, meaning when clicked on logout token and expiration date will be removed from storage
export const AUTH_LOAGOUT_FETCH = () => {
  return (dispatch) => {
    dispatch(LOAGOUT());
  };
};
//First I invoke authentification start action then fetching my token and expiration date using TMDB API and my key. After fetching I store this data in Local Storage
export const AUTH_FETCH = (username, password) => {
  return (dispatch) => {
    dispatch(AUTH_START());

    let key = "a1e70815ed514d294dc936b2f74a2ef3";
    axios
      .get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${key}`
      )
      .then((res) => {
        dispatch(AUTH_SUCCESS(res.data.request_token));
        localStorage.setItem("token", res.data.request_token);
        localStorage.setItem("expirationDate", res.data.expires_at);
      })
      .catch((error) => {
        dispatch(AUTH_FAIL(error));
      });
  };
};
//First checking my authentifation state by saying if token does not exist in local storage then invoke logout action.
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(LOAGOUT());
    } else {
      const expirationDate = localStorage.getItem("expirationDate");
      //If today date is bigger than expiration date of token, then of course I must invoke logout action, otherwise keep myself logged in
      if (expirationDate < new Date()) {
        dispatch(LOAGOUT());
      } else {
        dispatch(AUTH_SUCCESS(token));
      }
    }
  };
};
