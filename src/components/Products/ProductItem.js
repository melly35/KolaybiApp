import React, { memo, PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Dimensions } from "react-native";

import FastImage from 'react-native-fast-image'
import globalStyles from "../../styles/globalStyles";

import { useSelector, useDispatch } from 'react-redux'; 
import Actions from '../../redux/actions';


const ProductItem = (props) => {
    const _width = Dimensions.get('window').width;
    const _height = Dimensions.get('window').height;

    const dispatch = useDispatch(); 
    const accessToken = useSelector(state => state.authReducer.user.accessToken)

    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#fff"
            style={[styles.pContainer, {width: (_width / 2 - 17), height: (_width / 2 )}]}
            key={props.id}
            onPress={props.onPress}
        >
        <View style={[styles.imageContainer]}>
            <TouchableOpacity
                activeOpacity={0.6}
                underlayColor="#fff"
                style={[styles.addProductBtn]}
                key={props.productId}
                onPress={(e) => { dispatch(Actions.productActions.addCart({ 'accessToken': accessToken, 'productId': props.productId, 'count': 1 })) }}
            >
                <Text style={[{ fontSize: 26, color: '#fff', alignSelf: 'center',}]}>+</Text>
            </TouchableOpacity>
            <FastImage 
                style={[styles.imageBox, {}]}
                source={require('../../assets/testImage.jpeg')}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={[styles.overlayContainer, {}]}>
                
                <View style={[ {flexDirection: 'column', alignSelf: 'flex-start'}]}>
      
                    <View style={[styles.productTextContainer, {}]}> 
                        <Text style={[styles.productText]} numberOfLines={1}>{props.productName}</Text> 
                    </View> 
                    
                    <View style={[styles.productTextContainer, {}]}> 
                        <Text style={[styles.productText]} numberOfLines={1}>{props.productBarcode}</Text> 
                    </View> 

                    <View style={[styles.productTextContainer, {}]}> 
                        <Text style={[styles.productText]} numberOfLines={1}>{props.productPrice + ' ₺'}</Text> 
                    </View> 

                </View>
            </View>
            
        </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    pContainer: {  
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center', 
    marginVertical:6,
    marginHorizontal:3,   
    borderWidth:2,
    borderRadius: 10,
    borderColor: globalStyles.Black300
  },

  imageContainer: {
    alignSelf: 'stretch',
    flex: 1, 
    
  },

  imageBox: {
    width: '100%',
    height: '35%',
    borderRadius: 12,
    ...globalStyles.elevate3
  },

  overlayContainer: {
    width: '100%',
    height: '65%',
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0, .03)', 
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  productTextContainer: {
    backgroundColor: 'rgba(0,0,0, .8)',
    color: '#fff',
    marginVertical: 2,
    marginHorizontal: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productText: { 
    color: '#fff', 
    textAlign: 'center',
  },

  addProductBtn: {
    position: 'absolute',
    top:0, 
    right: 0,
    zIndex: 2,
    backgroundColor: globalStyles.Blue1,
    width: 36,
    height: 36,
    borderRadius: 10
  }


  
});

export default (ProductItem);