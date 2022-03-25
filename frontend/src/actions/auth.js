import axios from "axios";
import { returnErrors } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      //console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      //console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register =
  ({ id, username, password, email, first_name, last_name }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({
      username,
      email,
      first_name,
      last_name,
      password,
    });

    /* IF body has an ID we are editing a user(on the profile page) --> PUT request */
    /* TODO: add types USER_EDIT_SUCCESS and USER_EDIT_FAIL */
    if (id) {
      axios
        .put(`/api/auth/register/${id}/`, body, config)
        .then((res) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          //console.log(err);
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({
            type: REGISTER_FAIL,
          });
        });
      return;
    }

    axios
      .post("/api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        //console.log(err);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      //dispatch({ type: "CLEAR_LEADS" });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      //console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
