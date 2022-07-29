import React, { useRef, useEffect, useCallback, useState } from 'react';
import { AppState, Text, View, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'; 

import { useSelector, useDispatch } from 'react-redux';
import { persistor } from '../redux/store';

import { useIsFocused } from "@react-navigation/native"; 

const SplashScreen = ({navigation, props, route}) => {
  const isFocused = useIsFocused();
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)   

  useEffect(() => { 
    isLoggedIn ? navigation.navigate('HomeScreen') :  navigation.navigate('LoginScreen')
    //

    if(isFocused){  
      //isLoggedIn ? navigation.navigate('HomeScreen') :  navigation.navigate('LoginScreen')
    }

  }, [isFocused]);
     

  return (
    <>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
      SplashScreen
      </Text> 
      <ActivityIndicator color={'#333'} size="large" />
    </View> 
    </>
  );
}

export default SplashScreen;