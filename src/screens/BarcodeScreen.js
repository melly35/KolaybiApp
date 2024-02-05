import React, { PureComponent, useState, useEffect, useRef } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import QRCodeScanner from 'react-native-qrcode-scanner'; 

import { RNCamera } from 'react-native-camera'; 
import * as NavigationService from '../services/NavigationService';

const BarcodeScreen = ({navigation}) => {
    let [targetQRCode, setTargetQRCode] = useState('')

    useEffect(() => {
      request(PERMISSIONS.IOS.CAMERA).then((result) => {
        // …
      });

      check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            
            break;
        }
      })
      .catch((error) => {
        // …
      });
    }, []);

    onSuccess = e => {
      console.warn(e)
      //e.target, e.data

      setTargetQRCode(e.data)
 
    };

    onGotIt = e => {

    }
 
    return (
      <View style={{flex:1}}>
       
        <QRCodeScanner 
          onRead={this.onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={
            <Text style={styles.centerText}>
              <Text style={styles.textBold}>QRCODE: </Text> 
              {targetQRCode}
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable} onPress={this.onGotIt}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
        
      </View>
    );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default BarcodeScreen;