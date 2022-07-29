import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, RefreshControl, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

import { persistor } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import Actions from '../redux/actions';

import CButton from "../components/Generals/CButton";

import globalStyles from "../styles/globalStyles";

import { useIsFocused, useFocusEffect } from "@react-navigation/native";


const MyCartScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.authReducer.user.accessToken)
  const cartList = useSelector(state => state.generalReducer.carts)
  const cartStatus = useSelector(state => state.generalReducer.cartStatus)
  const [refreshing, setRefreshing] = useState(false)
  const [paymentSection, setPaymentSection] = useState(false)
  const [orderCustomerName, setOrderCustomerName] = useState('') 
  const [orderCustomerAddress, setOrderCustomerAddress] = useState('')
  const createOrderStatus = useSelector(state => state.generalReducer.createOrderStatus)
  const orderFinally = useSelector(state => state.generalReducer.orderFinally)


  const clears = () => {
    setPaymentSection(false)
    setOrderCustomerName('')
    setOrderCustomerAddress('')
    _handleRefresh()
  }

  const onHandlePaymentSection = () => {
    setPaymentSection(true)
  }

  const onHandlePayment= () => {
    if(orderCustomerName != '' && orderCustomerAddress != ''){
      let data = {
        orderCustomerName: orderCustomerName,
        orderCustomerAddress: orderCustomerAddress,
        accessToken: accessToken
      };
      dispatch(Actions.generalAction.createOrder(data))
    }
    else {
      Toast.show({
        type: 'cWarning',
        text1: 'Lütfen tüm alanları doldurunuz',
        text2: 'Müşteri Adı Soyadını ve Adresini Giriniz',
        visibilityTime: 2000,
      })
    }
  }


  const renderItem = (item) => (
    <View key={item.id} style={[{ flex: 1, borderWidth: 1, marginBottom: 5, padding: 5, flexDirection: 'row' }]}>
      <Text>{item.productName}</Text>
      <Text>  -  ({item.count}) </Text>
    </View>
  );

  const _handleRefresh = () => {
    dispatch(Actions.generalAction.getCarts({ 'accessToken': accessToken }))
  }; 

  useEffect(() => {
    dispatch(Actions.generalAction.getCarts({ 'accessToken': accessToken })) 
    setPaymentSection(false);

    if(isFocused){
      
    }

    return () => { 
      setPaymentSection(false); 
    }
  }, [isFocused]) 

  useEffect(() => { 
    orderFinally ? clears() : null

  }, [orderFinally])


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sepetim</Text>
      
      {
        cartStatus || createOrderStatus ? 
          <ActivityIndicator color={'#333'} size="large" />
        : 
          paymentSection ?

            <>
              <View style={[styles.inputRow]}>
                <View style={[globalStyles.col, { flex: 3.5, alignItems: 'center', justifyContent: 'center' }]}>
                  <TextInput
                    numberOfLines={1}
                    style={[globalStyles.input1, {}]}
                    placeholder='Müşteri Adı Soyadı'
                    placeholderTextColor={globalStyles.Black500}
                    value={orderCustomerName}
                    onChangeText={(text) => {
                      setOrderCustomerName(text);
                    }}
                  />
                </View>
              </View>

              <View style={[styles.inputRow]}>
                <View style={[globalStyles.col, { flex: 3.5, alignItems: 'center', justifyContent: 'center' }]}>
                  <TextInput
                    numberOfLines={1}
                    style={[globalStyles.input1, {}]}
                    placeholder='Müşteri Adresi'
                    placeholderTextColor={globalStyles.Black500}
                    value={orderCustomerAddress}
                    onChangeText={(text) => {
                      setOrderCustomerAddress(text);
                    }}
                  />
                </View>
              </View>

              <CButton title='Siparişi Oluştur' onPress={() => { onHandlePayment() }} />
            </>

            :
            cartList.length > 0 ?
              <>
                <FlatList
                  keyboardShouldPersistTaps="always"
                  style={{ flex: 1 }}
                  keyExtractor={(item) => item.id}
                  data={cartList}
                  initialNumToRender={2}
                  maxToRenderPerBatch={1}
                  updateCellsBatchingPeriod={100}
                  removeClippedSubviews={true}
                  renderItem={({ item }) => renderItem(item)}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={_handleRefresh}
                    />
                  }
                />

                <CButton title='Ödemeye Geç' onPress={() => { onHandlePaymentSection() }} />
              </>
              : <Text>Sepetinizde ürün bulunmamaktadır</Text>

      }

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  inputRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10
  }

});


export default MyCartScreen;