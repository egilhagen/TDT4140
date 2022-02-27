import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// CREATE MESSAGE
//  - error passwords dont match on register

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};
