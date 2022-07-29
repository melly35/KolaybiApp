import React, { memo, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Image, FlatList, Dimensions, RefreshControl } from "react-native";
import globalStyles from "../../styles/globalStyles"; 
import ProductItem from './ProductItem'

import Icon from "react-native-vector-icons/Ionicons"; 

const ProductList = (props) => { 

    useEffect(() => { 
    
        return () => { 
        }
    }, [])
    
    const pRenderItem = (item) => ( 
        <ProductItem
            containerStyle={{ flex: 1, justifyContent: 'space-evenly'}}
            key={item.id}
            onPress={() => { 
                props.onProductPress(item);
            }}  
            productBarcode={item.productBarcode}
            productName={item.productName}
            productPrice={item.productPrice}
            productId={item.id}
        /> 
    );  
 

    return (
        <FlatList   
        style={[styles.productList]}
        keyExtractor={(item) => item.id} 
        data={props.productData}
        renderItem={({item}) => pRenderItem(item)} 
        showsVerticalScrollIndicator={false}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{justifyContent: 'center', alignContent: 'center'}}   
      /> 
      
    );
};

const styles = StyleSheet.create({
    productList:{ 
        paddingVertical:5, 
        paddingHorizontal:8,
        paddingBottom: 20, 
    },

    locationBtn: {
        backgroundColor: '#fff',
        marginVertical: 8, 
        padding: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        ...globalStyles.elevate1,
      },
    
      locationIcon: {
        width:30,
        height: 30,
      },
    
      locationSelectedTitle: {
        marginLeft: 8,
        fontSize: 16,
        color: globalStyles.Black700,
        fontWeight: '600',
      },
    
      locationSelectOrChangeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    
      },
});

export default (ProductList);