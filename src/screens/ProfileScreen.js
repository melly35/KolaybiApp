import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

import { persistor } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../redux/actions';
import { useIsFocused, useFocusEffect } from "@react-navigation/native";



const ProfileScreen = ({navigation}) =>  {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducer.user)
  const accessToken = useState(userData.accessToken)
  const orderList = useSelector(state => state.generalReducer.orders)
  const orderStatus = useSelector(state => state.generalReducer.orderStatus)

  const renderItem = (item) => (
    <View key={item.id} style={[{ flex: 1, borderWidth: 1, marginBottom: 5, padding: 5}]}>
      <Text>#{item.id} {item.customerName}</Text> 
      <Text> - {item.customerAddress}</Text>
    </View>
  );
  

  const logout = () => {  
      dispatch(Actions.authActions.logout());

      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });
      //persistor.persist(); 
      //navigation.navigate('SplashScreen')
  };

   //Again focused refreshing
   useEffect(() => {  
    if (isFocused) { 
      dispatch(Actions.generalAction.getOrders({'accessToken': accessToken})) 
    }

    return () => {
    }
  }, [isFocused])
  


  return (
    <SafeAreaView style={[{flex:1}]}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text style={{flex:.1}}>ProfileScreen</Text>

      <Text style={{flex:.1}}>Geçmiş Siparişlerim</Text>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={{flex:1}}
        keyExtractor={(item) => item.id}
        data={orderList}  
        initialNumToRender={2} 
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={100}
        removeClippedSubviews={true}  
          renderItem={({item}) => renderItem(item)}
      />


      <TouchableOpacity onPress={() => { logout()  }}>
          <Text style={[{ fontSize: 20, fontWeight: 'bold', marginVertical: 20}]}>LOGOUT ({userData.name_surname})</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;