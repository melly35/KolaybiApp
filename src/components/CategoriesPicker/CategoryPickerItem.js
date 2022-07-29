import React, { memo, PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from 'react-native-fast-image'

import globalStyles from "../../styles/globalStyles";


const CategoryPickerItem = (props) => {
    return (
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
        <View style={styles.view}>
          <Text numberOfLines={1} style={styles.name}>
            {props.name}
          </Text>
          <Text numberOfLines={1} style={styles.code}>
            {props.code}
          </Text>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    flexDirection: "row",
    height: 34,
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 5,
  },
  flag: {
    flex: 0.7,
    fontSize: 24,
    color: globalStyles.Black
  },
  name: {
    textAlignVertical:'center',
    flex: 3,
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: "300",
    color: '#121212',
    marginLeft: 10,

  },
  code: {
    flex: 1.1,
    fontSize: 20,
    fontWeight: "600",
    color: "#161616"
  },

  catLogo:{
    width: 34,
    height: 34,
    alignSelf: 'center',
  },

});

export default memo(CategoryPickerItem);