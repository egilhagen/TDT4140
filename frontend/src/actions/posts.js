// frontend/src/actions/todos.js

//TODO: endre fra "todos" til "posts"

import { tokenConfig } from './auth'; // added

// GET TODOS
export const getTodos = () => async (dispatch, getState) => {
  const res = await axios.get('/api/todos/', tokenConfig(getState));
  // ...
};

// GET TODO
export const getTodo = id => async (dispatch, getState) => {
  const res = await axios.get(`/api/todos/${id}/`, tokenConfig(getState));
  // ...
};

// ADD TODO
export const addTodo = formValues => async (dispatch, getState) => {
  const res = await axios.post(
    '/api/todos/',
    { ...formValues },
    tokenConfig(getState)
  );
  // ...
};

// DELETE TODO
export const deleteTodo = id => async (dispatch, getState) => {
  await axios.delete(`/api/todos/${id}/`, tokenConfig(getState));
  // ...
};

// EDIT TODO
export const editTodo = (id, formValues) => async (dispatch, getState) => {
  const res = await axios.patch(
    `/api/todos/${id}/`,
    formValues,
    tokenConfig(getState)
  );
  // ...
};