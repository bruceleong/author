import axios from 'axios';

//action types
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

const setCurrentUser = user => {
  const action = {
    type: SET_CURRENT_USER,
    user
  }
  return action;
}

export const removeCurrentUser = () => {
  const action = {
    type: REMOVE_CURRENT_USER
  }
  return action;
}

export default function reducer (currentUser = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return currentUser;
  }
}

export const login = (credentials, history) => dispatch => {
  axios.post('/login', credentials)
    .then(res => setUserAndRedirect(res.data, history, dispatch))
    .catch(err => console.error(`Logging in with ${credentials.email} and ${credentials.password} was unsuccesful`, err));
};

function setUserAndRedirect (user, history, dispatch) {
  dispatch(setCurrentUser(user));
  history.push(`/users/${user.id}`)
}
