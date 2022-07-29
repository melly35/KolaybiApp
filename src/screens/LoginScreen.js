import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet,
  Image,
  TextInput,
  Button,
  Modal,
  TouchableOpacity
 } from 'react-native'; 

import globalStyles from '../styles/globalStyles'
 
import PasswordInput from '../components/Generals/PasswordInput'
import CButton from '../components/Generals/CButton' 
 
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../redux/actions';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [_email, setEmail] = useState('');
  const [_password, setPassword] = useState(''); 

  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)  

  useEffect(() => {  
    //isLoggedIn
    isLoggedIn ? navigation.navigate('HomeScreen') :  navigation.navigate('LoginScreen')
   
  }, [])
     

  const onLogin = () => { 
    if(_email != '' && _password != '')
    {
      let data = {
        email: _email,
        password: _password
      };
      dispatch(Actions.authActions.loginUserAction(data))
    }
    else {
      Toast.show({
        type: 'cWarning',
        text1: 'Lütfen tüm alanları doldurunuz',
        text2: 'E-Mail ve Şifre Giriniz',
        visibilityTime: 3000,
      })
    }
    
  }

  return (
    <SafeAreaView style={[globalStyles.container, {backgroundColor: '#fff'}]}>

      <View style={[globalStyles.row, {flex:1, alignItems: 'center', justifyContent: 'center'}]}>
        <Text>KolayBi - Sipariş Uygulaması</Text>
      </View>

      <View style={[globalStyles.container, {flex:3, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, flexDirection: 'column'}]}>
        <View style={[styles.inputRow]}>
         
          <View style={[globalStyles.col, {flex:3.5, alignItems: 'center', justifyContent: 'center'}]}>
            <TextInput  
              numberOfLines={1} 
              style={[globalStyles.input1, {}]}
              placeholder='E-Mail'
              placeholderTextColor={globalStyles.Black500}
              value={_email} 
              onChangeText={(text) => { 
                setEmail(text);
              }}
              keyboardType='numeric'
            /> 
          </View>
        </View>
        <View style={[styles.inputRow]}> 
          <View style={[globalStyles.col, {flex:4, alignItems: 'center', justifyContent: 'center'}]}>
            <PasswordInput
              placeholder='Şifre'
              value={_password}
              onChangeText={(text) => { 
                  setPassword(text);
              }}
            />
          </View>
        </View>

        <View style={[styles.inputRow, {marginTop: 35}]}> 
          <View style={[globalStyles.col, {flex:4, alignItems: 'center', justifyContent: 'center'}]}>
            <CButton  
              title='Giriş Yap' 
              buttonStyle={[{width:'80%', backgroundColor: 'black'}]}
              onPress={(e) =>  onLogin() }
            /> 
          </View>
        </View>

        <View style={[styles.inputRow, {marginTop: 5}]}> 
          <TouchableOpacity onPress={(e) => { navigation.navigate('RegisterScreen') }} style={[globalStyles.col, {flex:4, alignItems: 'center', justifyContent: 'center'}]}>
            <Text style={[{fontWeight: '600', marginLeft: 5, color: globalStyles.Blue1}]}>Üye ol</Text>
          </TouchableOpacity>
        </View>

      </View>
       
    </SafeAreaView>
     
  );
}

const styles = StyleSheet.create({ 
  
  appLogo: {
    width: 100,
    height: 100, 
  }, 
  selectCountryButton: {
    borderColor: '#eee',
    borderWidth: 2,
    borderRadius: 8, 
    paddingHorizontal: 5,
    width: 75,
    height: 55,
    
  },
  countryCodePlaceholder: {
    position: 'absolute',
    top:5,
    left:0,
    right:0,
    fontSize: 11,
    textAlign: 'center',
    color: globalStyles.Black500,
  },
  countryCodeValue: {
    marginTop: 23,
    color: globalStyles.Black,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 5
  },
  inputRow: {
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row',
    marginBottom: 10,
  }
});

export default LoginScreen;