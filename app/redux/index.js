import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {fromJS} from 'immutable';

//子reducer
import constant from './constant';
import movies from './movies';
import publicInfo from './public';


const rootReducer = combineReducers({
  constant,
  movies,
  publicInfo,
});

// The transformer
const mapTransformer = config =>
  createTransform(
    dataIn => {
      // console.info('[createTransform]dataIn', dataIn)
      return {
        ...dataIn,
        collectMovies: JSON.stringify(Array.from(dataIn.collectMovies))
      }
    },
    dataOut => {
      // console.info('[createTransform]dataOut', dataOut)
      return {
        ...dataOut,
        collectMovies: new Map(JSON.parse(dataOut.collectMovies))
      }
    },
    config,
  );


const persistConfig = {
  key: 'root',
  storage,
  transforms: [mapTransformer({whitelist: ['movies']})]
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
