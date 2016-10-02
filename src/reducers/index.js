import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import locale from './locale.reducer';
import administration from './administration.reducer';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
  authentication,
  locale,
  routing,
  administration
});
