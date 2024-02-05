import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
  Animated,
  Keyboard,
  ScrollView,
  FlatList,
  RefreshControl
} from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";
import ProductList from '../components/Products/ProductList'

import { useSelector, useDispatch } from 'react-redux';
import globalStyles from '../styles/globalStyles';
import Actions from '../redux/actions';
import MainFilterComp from "../components/Generals/MainFilterComp";

import { useIsFocused, useFocusEffect } from "@react-navigation/native";



const HomeScreen = ({ navigation, route }) => {
  
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.authReducer?.user)

  const params = route.params
  console.log('Home-PARAMS', route)

  const [searchInput, setSearchInput] = useState(null);
  const [searchClick, setSearchClick] = useState(false);
  const accessToken = useSelector(state => state.authReducer.user.accessToken)
  const productList = useSelector(state => state.productReducer.products)

  const [refreshing, setRefresing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pQuery, setPquery] = useState('');
  const [pPrice, setPprice] = useState('');
  const [pCategory, setPcategory] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const [filterSection, setFilterSection] = useState(false);

  //Again focused refreshing
  useEffect(() => {   
    if (isFocused) { 
      _handleRefresh()
    }

    return () => {
    }
  }, [isFocused])

  const _handleRefresh = () => {
    dispatch(Actions.productActions.getProducts({ accessToken: accessToken }))
  };

  const getProducts = (e = {}) => {
    let productQuery = {
      accessToken: accessToken,
    }

    if (Object.keys(e).length === 0) {
      setPcategory('')
      setPprice('')
    }
    else {

      e.hasOwnProperty('price') ? productQuery.price = e.price : null
      e.hasOwnProperty('category') ? productQuery.category = e.category : null
    }

    pQuery != '' ? productQuery.query = pQuery : null

    dispatch(Actions.productActions.getProducts(productQuery))
  }


  const searchIn = () => {

  };

  const searchOut = () => {
    setSearchInput('')
    setPquery('')
    setSearchClick(false)
    getProducts()
    Keyboard.dismiss()
  };


  //First create
  useEffect(() => { 
    getProducts() 
    dispatch(Actions.productActions.getCategories({ 'accessToken': accessToken }))
    dispatch(Actions.productActions.getSubCategories({ 'accessToken': accessToken }))

    return () => {

    }
  }, [])


  return ( 

    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>
      <View style={[styles.headerAndSearch]}>

      <TouchableOpacity style={[styles.filterBtn]} onPress={(e) => { navigation.navigate('BarcodeScreen') }} >
          <Icon name="ios-barcode" size={26} color={globalStyles.Black600} /> 
        </TouchableOpacity>

        <View style={[styles.searchBoxContainer]}>
          <Icon name="search" size={26} color={globalStyles.Black200} />
          <TextInput
            numberOfLines={1}
            returnKeyType="done"
            onChangeText={(text) => {
              setSearchInput(text)
              if (text.length > 2) {
                setSearchClick(true)
                setSearchStatus(true)
                setPquery(text)
                getProducts()
              }
              else {
                setSearchStatus(false)
                setPquery('')
                getProducts()
              }
            }}
            onFocus={(e) => searchIn()}
            onBlur={(e) => searchOut()}
            value={searchInput}
            placeholder="Ara (Barcode, Ürün Adı)"
            placeholderTextColor={globalStyles.Black400}
            style={{
              ...styles.searchInput,
              ...{},
            }}
          />

          {searchClick ?
            <TouchableOpacity onPress={(e) => { searchOut() }} >
              <Icon name="ios-close" size={26} color={globalStyles.Black700} />
            </TouchableOpacity> : null
          }
        </View>

        <TouchableOpacity style={[styles.filterBtn]} onPress={(e) => { setFilterSection(true) }} >
          <Icon name="ios-filter" size={26} color={globalStyles.Black600} />
          <MainFilterComp
            visible={filterSection}
            onDismiss={() => setFilterSection(false)}
            onFiltered={(e) => { getProducts(e) }}
          />
        </TouchableOpacity>

      </View>

      <View>
        <Text style={[styles.categoriesTitle]}>Kategoriler</Text> 
      </View>

      <ProductList
        productData={productList}
        onProductPress={(e) => { console.log('seçilen ürün: ', e) }}
      />
 
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  headerAndSearch: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 6,
    paddingTop: 10,
    paddingHorizontal: 8,
  },

  headerProfileMenu: {
    backgroundColor: 'white',
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...globalStyles.elevate1
  },

  headerProfileMenu_Text: {
    color: globalStyles.Blue1,
    fontSize: 24,

  },

  searchBoxContainer: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 6,
    ...globalStyles.elevate2
  },

  searchInput: {
    color: globalStyles.Black800,
    height: 42,
    fontSize: 16,
    paddingRight: 5,
    flex: 1
  },

  searchList: {
    paddingTop: 10,
  },

  filterBtn: {
    backgroundColor: 'white',
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...globalStyles.elevate1
  },

  categoriesTitle: {
    color: globalStyles.Black,
    fontSize: 24,
    paddingLeft: 8,
  },



});


export default HomeScreen;