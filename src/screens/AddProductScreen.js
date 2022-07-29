import React, { useState, useRef, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Animated, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
  
import globalStyles from '../styles/globalStyles';
import CategoryPickerList from '../components/CategoriesPicker/CategoryPickerList'
import SubCategoryPickerList from '../components/CategoriesPicker/SubCategoryPickerList'
import CButton  from "../components/Generals/CButton";

import { useSelector, useDispatch } from 'react-redux';
import Actions from '../redux/actions';
import Toast from 'react-native-toast-message';

//import Modal from "react-native-modal"; 

const AddRentalScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible_sub, setVisibleSub] = useState(false);
  const [_selectedCategory, setSelectedCategory] = useState(); 
  const [_selectSubCategory, setSelectedSubCategory] = useState();  
  const isLoading = useSelector(state => state.productReducer.isLoading)
  const accessToken = useSelector(state => state.authReducer.user.accessToken)
  const addProductStatus = useSelector(state => state.productReducer.addProductStatus)
  
  
  const clearInput = () => {
    setProductName("")
    setProductPrice("")
    setProductBarcode("")
    setProductDesc("")
    setSelectedCategory()
    setSelectedSubCategory()
  }

  const handleAddProduct = () => {
  
    if(productBarcode != '' && productPrice != '' && _selectedCategory != null && _selectSubCategory != null && productName != '')
    {
      let data = {
        'productBarcode' : productBarcode,
        'productName' : productName,
        'productDesc' : productDesc,
        'productPrice' : productPrice,
        'mainCategoryId': _selectedCategory.id,
        'subCategoryId': _selectSubCategory.id,
        'accessToken': accessToken
      }
      dispatch(Actions.productActions.addProduct(data))
    }
    else
    {
      Toast.show({
        type: 'cWarning',
        text1: 'Lütfen tüm alanları doldurunuz',
        text2: 'Ürün detay hariç hepsi zorunludur.',
        visibilityTime: 2000,
      })
    }
    

  } 

  useEffect(() => { 
    addProductStatus ? clearInput() : null

  }, [addProductStatus])
 
   
  return (
    
    <SafeAreaView style={{ flex: 1 }}> 
      { isLoading ? <ActivityIndicator color={'#333'} size="large" /> : <View style={[globalStyles.container, { padding: 15}]}>
        <Text>Ürün Ekle</Text>

        <View style={[globalStyles.container, {}]}>
          <View style={[styles.inputRow]}>
            <View style={[globalStyles.col, {flex:3.5, alignItems: 'center', justifyContent: 'center'}]}>
              <TextInput  
                numberOfLines={1} 
                style={[globalStyles.input1, {}]}
                placeholder='Barcode'
                placeholderTextColor={globalStyles.Black500}
                value={productBarcode} 
                onChangeText={(text) => { 
                  setProductBarcode(text);
                }}
                maxLength={15}
              /> 
            </View>
          </View>

          <View style={[styles.inputRow]}>
            <View style={[globalStyles.col, {flex:3.5, alignItems: 'center', justifyContent: 'center'}]}>
              <TextInput  
                numberOfLines={1} 
                style={[globalStyles.input1, {}]}
                placeholder='Ürün Adı'
                placeholderTextColor={globalStyles.Black500}
                value={productName} 
                onChangeText={(text) => { 
                  setProductName(text);
                }}
              /> 
            </View>
          </View>

          <View style={[styles.inputRow]}>
            <View style={[globalStyles.col, {flex:3.5, alignItems: 'center', justifyContent: 'center'}]}>
              <TextInput  
                numberOfLines={1} 
                style={[globalStyles.input1, {}]}
                placeholder='Ürün Fiyatı'
                placeholderTextColor={globalStyles.Black500}
                value={productPrice} 
                onChangeText={(text) => { 
                  setProductPrice(text); 
                }}
                keyboardType={'decimal-pad'}
              /> 
            </View>
          </View>

          <View style={[styles.inputRow]}>
            <View style={[globalStyles.col, {flex:3.5, alignItems: 'center', justifyContent: 'center'}]}>
              <TextInput   
                style={[globalStyles.input1, { height: 100}]}
                placeholder='Ürün Detay'
                placeholderTextColor={globalStyles.Black500}
                value={productDesc} 
                onChangeText={(text) => { 
                  setProductDesc(text);
                }}
                multiline = {true}
                numberOfLines = {4} 
              /> 
            </View>
          </View>

          <View style={[styles.inputRow]}>
            <View style={[globalStyles.col, {flex:3.5, alignItems: 'center', justifyContent: 'center'}]}>
              <TouchableOpacity 
                style={[globalStyles.input1, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                onPress={() => setVisible(true)} title="Show Modal"
              >
              <Text style={[styles.categoryName]}> { 
              _selectedCategory ? _selectedCategory.categoryName : 'Kategoriler' 
              }</Text>
                
              </TouchableOpacity>
              <CategoryPickerList 
                visible={visible}
                onDismiss={() => setVisible(false)}
                onCategoryPress={(category) => {setSelectedCategory(category); setSelectedSubCategory()}}
              /> 
              
            </View>
          </View>

          {
            _selectedCategory ? 
            <View style={[styles.inputRow]}>
            <View style={[globalStyles.col, {flex:3.5, alignItems: 'center', justifyContent: 'center'}]}>
              <TouchableOpacity 
                style={[globalStyles.input1, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                onPress={() => setVisibleSub(true)} title="Show Modal"
              >
              <Text style={[styles.categoryName]}> { 
              _selectSubCategory ? _selectSubCategory.subCategoryName : ' Alt Kategoriler'
              }</Text>
                
              </TouchableOpacity>

              <SubCategoryPickerList 
                getMainCategoryId={_selectedCategory.id}
                visible={visible_sub}
                onDismiss={() => setVisibleSub(false)}
                onSubCategoryPress={(category) => {setSelectedSubCategory(category)}}
              /> 
              
            </View>
          </View> : null
          }

          <CButton  
              title='Ürünü Kaydet'
              onPress={(e) =>  handleAddProduct() }
            /> 
        </View> 

      </View> }
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  categoryName: { 
    color: globalStyles.Black600,
    fontSize: 16,
  },
  
  inputRow: {
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row',
    marginBottom: 10,
  }

});

export default AddRentalScreen;