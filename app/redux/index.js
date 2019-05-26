import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import { createEpicMiddleware } from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

//
import constant from '../redux/constant';

// import config from '../redux/config';
// import user from '../redux/user';
// import stores from '../redux/stores'
// import checkItem from '../redux/checkItem';
// import inspectionItem from '../redux/inspectionItem';
// import inspectionItemData from '../redux/inspectionItemData';
// import comments from './comments';
// import history from './history';
// import constant from './constant';
// import messageList from './messageList';

const rootReducer = combineReducers({
 constant
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const epicMiddleware = createEpicMiddleware();
const middleWares = [
  thunkMiddleware,
  // epicMiddleware,
];
const enhancers = applyMiddleware(...middleWares);

const store = createStore(persistedReducer, composeWithDevTools(enhancers));
const persistor = persistStore(store);

// store.runEpic = epicMiddleware.run;

export {store, persistor};
