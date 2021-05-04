import {
  AUTH_MEDIUM,
  AUTH_MEDIUM_SUCCESS,
  AUTH_MEDIUM_FAILED,
  POST_MEDIUM,
  POST_MEDIUM_SUCCESS,
  POST_MEDIUM_FAILED,
} from 'Actions/medium';

import { remote } from 'electron';

const { shell } = remote;

const assign = Object.assign;

function medium(state = {}, action) {
  switch (action.type) {
    case AUTH_MEDIUM:
      return state;
    case AUTH_MEDIUM_SUCCESS: {
      state.medium = action.medium;
      return assign({}, state);
    }
    case AUTH_MEDIUM_FAILED:
      return state;
    case POST_MEDIUM:
      return state;
    case POST_MEDIUM_SUCCESS: {
      shell.openExternal(action.postUrl);
      return assign({}, state);
    }
    case POST_MEDIUM_FAILED:
      return state;
    default:
      return state;
  }
}

export default medium;
