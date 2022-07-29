import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import globalStyles from "../../styles/globalStyles";
 


const PasswordInput = (props) => {
    const [input, setInput] = useState(null); 
    const [secureStatus, setSecureStatus] = useState(true); 
    const [passwordIcon, setPasswordIcon] = useState('ios-eye-outline'); 


    const showHidePassword = () => { 
        if(secureStatus)
        {
            setSecureStatus(false) 
        }
        else
        {
            setSecureStatus(true) 
        }
    }

    return (
        <View
            style={[globalStyles.input1, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}]}
        >
            
            <TextInput  
                ref={props.ref}
                numberOfLines={1}
                returnKeyType="done" 
                style={[{borderWidth: 0, flex:1, fontSize: 18}]}
                secureTextEntry={secureStatus}
                placeholder={props.placeholder}
                placeholderTextColor={globalStyles.Black500}
                value={props.value}
                onChangeText={props.onChangeText}
            /> 
            <TouchableOpacity onPress={(e) => showHidePassword()}> 
                <Image
                    resizeMode={'contain'}
                    source={
                        secureStatus
                            ? require('../../assets/icons/eye_x32.png')
                            : require('../../assets/icons/eye-off_x32.png')
                    }
                    style={[{width:26, height:26, opacity: .8}]}
                />
            </TouchableOpacity>
        </View>
        
    );
};  

const styles = StyleSheet.create({
   
});

export default PasswordInput;