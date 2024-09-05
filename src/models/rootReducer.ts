import {combineReducers} from 'redux';
import {reducer as appReducer} from '../App/models/appReducer';
import {
  reducer as exploreReducer,
  initialState as exploreInitialState,
} from '../App/modules/Explore/models/exploreReducers';
import {reducer as authReducer} from '../App/modules/Auth/models/authReducers';
import {reducer as trocItemReducer} from '../App/modules/TrocItem/models/trocItemReducers';
import {
  reducer as userReducer,
  initialState as userInitialState,
} from '../App/modules/User/models/user/userReducers';
import {
  reducer as otherUserReducer,
  initialState as otherUserInitialState,
} from '../App/modules/User/models/otherUser/otherUserReducers';
import {
  reducer as messengerReducer,
  initialState as messengerInitialState,
} from '../App/modules/Messenger/models/messengerReducers';
import {
  reducer as orderReducer,
  initialState as orderInitialState,
} from '../App/modules/Order/models/orderReducers';
import {
  reducer as notificationReducer,
  initialState as notificationInitialState,
} from '../App/modules/Notification/models/notificationReducers';
import {RESET_APP_DATA} from '../App/models/appActionTypes';

const appReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  otherUser: otherUserReducer,
  user: userReducer,
  explore: exploreReducer,
  trocItem: trocItemReducer,
  messenger: messengerReducer,
  order: orderReducer,
  notification: notificationReducer,
});

interface RootState {
  app: ReturnType<typeof appReducer>;
  auth: ReturnType<typeof authReducer>;
  otherUser: ReturnType<typeof otherUserReducer>;
  user: ReturnType<typeof userReducer>;
  explore: ReturnType<typeof exploreReducer>;
  trocItem: ReturnType<typeof trocItemReducer>;
  messenger: ReturnType<typeof messengerReducer>;
  order: ReturnType<typeof orderReducer>;
  notification: ReturnType<typeof notificationReducer>;
}

const rootReducer = (
  state: RootState | undefined,
  action: {type: string; payload: any},
) => {
  if (action.type === RESET_APP_DATA) {
    // Reset the state to its initial value when the user logs out

    if (state) {
      state = {
        ...state,
        user: userInitialState,
        otherUser: otherUserInitialState,
        explore: exploreInitialState,
        messenger: messengerInitialState,
        order: orderInitialState,
        notification: notificationInitialState,
      };
    }
  }

  return appReducers(state, action);
};

export default rootReducer;
