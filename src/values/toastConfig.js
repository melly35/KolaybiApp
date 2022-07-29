import React, { useRef } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import globalStyles from '../styles/globalStyles';

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'blue' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  cSuccess: ({ text1, text2, props }) => (
    <View style={[{
        ...globalStyles.customToastContainer,
        ...globalStyles.elevate4
      }]}
    > 
      <View style={[{width:50, height:50, alignSelf: 'center', backgroundColor: '#38b259', justifyContent:'center', borderRadius: 18, overflow: 'hidden',}]}>
        <Image style={[{width:32, height:32, alignSelf: 'center'}]} resizeMode={'contain'} source={require('../assets/icons/ok.png')} />  
      </View>
      <View style={[{flex: 1, marginLeft: 10, justifyContent: 'center'}]}>
        { text1 != undefined && text1.length > 3 ? <Text style={[{}]}>{text1}</Text> : null }
        { text2 != undefined && text2.length > 3 ? <Text style={[{}]}>{text2}</Text> : null }
      </View>
      
    </View>
  ), 

  cInfo: ({ text1, text2, props }) => (
    
    <View style={[{
        ...globalStyles.customToastContainer,
        ...globalStyles.elevate4
      }]}
    > 
      <View style={[{width:50, height:50, alignSelf: 'center', backgroundColor: '#0069de', justifyContent:'center', borderRadius: 18, overflow: 'hidden',}]}>
        <Image style={[{width:32, height:32, alignSelf: 'center'}]} resizeMode={'contain'} source={require('../assets/icons/info.png')} />  
      </View>
      <View style={[{flex: 1, marginLeft: 10, justifyContent: 'center'}]}>
        { text1 != undefined && text1.length > 3 ? <Text style={[{}]}>{text1}</Text> : null }
        { text2 != undefined && text2.length > 3 ? <Text style={[{}]}>{text2}</Text> : null }
      </View>
      
    </View>
  ),

  cWarning: ({ text1, text2, props }) => (
    
    <View style={[{ 
        ...globalStyles.customToastContainer,
        ...globalStyles.elevate4, 
      }]}
    > 
      <View style={[{width:50, height:50, alignSelf: 'center', backgroundColor: '#f0ad4e', justifyContent:'center', borderRadius: 18, overflow: 'hidden',}]}>
        <Image style={[{width:32, height:32, alignSelf: 'center'}]} resizeMode={'contain'} source={require('../assets/icons/info.png')} />  
      </View>
      <View style={[{flex: 1, marginLeft: 10, justifyContent: 'center'}]}>
        { text1 != undefined && text1.length > 3 ? <Text style={[{flex:1}]}>{text1}</Text> : null }
        { text2 != undefined && text2.length > 3 ? <Text style={[{marginTop:5}]}>{text2}</Text> : null }
      </View>
      
    </View>
  ),

  cError: ({ text1, text2, props }) => (
    
    <View style={[{
        ...globalStyles.customToastContainer,
        ...globalStyles.elevate4
      }]}
    > 
      <View style={[{width:50, height:50, alignSelf: 'center', backgroundColor: '#d9534f', justifyContent:'center', borderRadius: 18, overflow: 'hidden',}]}>
        <Image style={[{width:32, height:32, alignSelf: 'center'}]} resizeMode={'contain'} source={require('../assets/icons/info.png')} />  
      </View>
      <View style={[{flex: 1, marginLeft: 10, justifyContent: 'center'}]}>
        { text1 != undefined && text1.length > 3 ? <Text style={[{}]}>{text1}</Text> : null }
        { text2 != undefined && text2.length > 3 ? <Text style={[{}]}>{text2}</Text> : null }
      </View>
      
    </View>
  )
};

 


export default toastConfig