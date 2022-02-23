// frontend/src/reducers/index.js



// add the auth reducer to the parent reducer. 

import auth from './auth'; // added

export default combineReducers({
  form: formReducer,
  todos,
  auth // added
});