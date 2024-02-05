import React, { PureComponent, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 

const BarcodeScreen = ({navigation, route}) => {
    let [targetQRCode, setTargetQRCode] = useState('')
    const params = route.params
    console.log('TEST-PARAMS', params)

   
    return (
      <View style={{flex:1}}>
       
        <Text>TEST</Text>
        
      </View>
    );
}

const styles = StyleSheet.create({
  
});

export default BarcodeScreen;