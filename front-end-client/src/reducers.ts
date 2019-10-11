import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './utils/history';
import globalReducer from './containers/Home/reducer';

// import { reducer as formReducer } from 'redux-form'

// import globalReducer from 'containers/App/reducer'
// import orderReducer from 'containers/Orders/reducer';
// import userReducer from 'containers/Profile/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    ...injectedReducers
  });

  // Wrap the root reducer and return a new root reducer with router state

  return rootReducer;
}
