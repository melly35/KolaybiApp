import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'

import { composeWithDevTools } from 'redux-devtools-extension';


import AsyncStorage from '@react-native-async-storage/async-storage'; 

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authReducer']
  };


import reducers from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))  
)

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga)



export { store, persistor };

