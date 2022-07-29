import React, { useRef, useState, useEffect } from 'react';
import { Text, View, StatusBar } from 'react-native';

import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, persistor } from './src/redux/store'; 

import Toast from 'react-native-toast-message';
import toastConfig from './src/values/toastConfig.js';
 
import RootNav  from './src/navigations/Navigations'; 

import { PersistGate } from 'redux-persist/integration/react'; 

const App = () => { 

  useEffect(() => { 
  
    return () => {
      
    }
  }, [])
   
    
  return (
    <> 
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="dark-content" />
          <RootNav/>   
          <Toast
            position='top'
            config={toastConfig}  
          />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;