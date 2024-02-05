import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createStackNavigator } from '@react-navigation/stack';


//Screens
import HomeScreen  from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen"; 
import AddProductScreen from "../screens/AddProductScreen";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MyCartScreen from "../screens/MyCartScreen";
import BarcodeScreen from "../screens/BarcodeScreen";
import TestScreen from "../screens/TestScreen";
 
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; 
import globalStyles from '../styles/globalStyles';

import { navigationRef } from "../services/NavigationService";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: globalStyles.MainBackgroundColor,
  },

  headerStyles: {
    headerBackTitleVisible:false,
    headerStyle: {
      backgroundColor: '#fff',
      ...globalStyles.elevate2
    },
    headerTintColor: globalStyles.Black800,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    
  }
};


const Tab = createBottomTabNavigator();


const HomeStack = createStackNavigator();

function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator options={{tabStyle: { display: 'none' }}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />  
    </HomeStack.Navigator>
  )
}


const ProfileStack = createStackNavigator();

function ProfileStackScreen({ navigation }) {
  return (
    <ProfileStack.Navigator options={{tabStyle: { display: 'none' }}}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} /> 
    </ProfileStack.Navigator>
  )
}

const MyCartStack = createStackNavigator();

function MyCartStackScreen({ navigation }) {
  return (
    <MyCartStack.Navigator options={{tabStyle: { display: 'none' }}}>
      <MyCartStack.Screen name="MyCartScreen" component={MyCartScreen} options={{ headerShown: false }} /> 
    </MyCartStack.Navigator>
  )
}

const AddProductStack = createStackNavigator(); 

function AddProductStackScreen({ navigation }) {  
  return (
    <AddProductStack.Navigator>
      <AddProductStack.Screen name="AddProductScreen" component={AddProductScreen}  options={{ headerShown: true, headerLeft: (e) => (
          <TouchableOpacity
            style = {{
              width: 50,
              height: 50,
              backgroundColor: 'red'
            }}
            onPress={() => {
              navigation.setOptions({tabBarStyle: { display: 'flex' }});
              navigation.goBack();                  
            }}
            title="Info"
            color="#fff"
          />
        ), }} /> 
    </AddProductStack.Navigator>
  )
} 


function RootTabs({navigation, route}) { 
    const [hideTabBar, setHideTabBar] = useState("flex");
    
    return (
        <Tab.Navigator 
  
        screenOptions={({route}) => ({
          
          tabBarShowLabel:true,
          headerShown: false,  
          tabBarVisible: false,
          tabBarStyle: { display: hideTabBar }, 
          tabBarHideOnKeyboard: true
        })}   
      >
  
        <Tab.Screen
          name= {'HomeScreenTab'}
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Anasayfa',  
          }}
          initialParams={{ itemId: 42 }}
        />
        
        <Tab.Screen
          name = {'AddProduct'}
          component={AddProductStackScreen}
          options={{
            tabBarLabel: 'AddProduct',   
          }}
          listeners={{
            tabPress: (e) => { 
              e.preventDefault()
              navigation.navigate('AddProductScreen')
              navigation.setOptions({tabBarStyle: { display: 'none' }});
            }
        }} />

        <Tab.Screen
          name= {'MyCartScreens'}
          component={MyCartStackScreen}
          options={{
            tabBarLabel: 'Sepetim',  
        }}/>


        <Tab.Screen
          name = {'Profil'}
          component={ProfileStackScreen}
          options={{
            tabBarLabel: 'Profil', 
          }}
        />
  
      </Tab.Navigator>
    );  
   
  }


function RootNavigation(){
    return (
        <NavigationContainer theme={MyTheme} ref={navigationRef}> 
            <Stack.Navigator> 
              <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" component={RootTabs} options={{ headerShown: false, gestureEnabled: false }}  /> 
              <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{ headerShown: true,  ...MyTheme.headerStyles }} /> 
              <Stack.Screen name="BarcodeScreen" component={BarcodeScreen} options={{ headerShown: true }} />
              <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: true }} />
              
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
 
  navbarLogo: {
    height: 24, 
  }, 
});

export default RootNavigation