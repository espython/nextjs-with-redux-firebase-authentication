import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';
import rootSaga from './root-sagas';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger)
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore(initialState = {}) {
  let store;
  const sagaMiddleware = createSagaMiddleware()
  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
      key: 'root',
      storage
    };
    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      bindMiddleware([sagaMiddleware])
    );
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      initialState,
      bindMiddleware([sagaMiddleware])
    );
  }


  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore;

