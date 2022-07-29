import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles"; 


const PasswordInput = (props) => {
      
    return (  
        <TouchableOpacity  
            ref={props.ref}  
            style={{
                ...props.buttonStyle,
                ...styles.button,     
                ...props.style            
              }}
            onPress={props.onPress}
        >  
            <Text style={[styles.buttonText]}>{props.title}</Text>
        </TouchableOpacity>  
    );
};  

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#007bff',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 5
    },
    buttonText:{ 
        color: '#ffffff', 
        fontSize: 18,
        textAlign: 'center'
    },
});

export default PasswordInput;