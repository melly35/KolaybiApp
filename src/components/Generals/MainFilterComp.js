
import React, { useState, useEffect, useRef } from "react";
import {
  View, 
  TextInput,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text
} from "react-native"; 

import CategoryPickerList from "../CategoriesPicker/CategoryPickerList";
import globalStyles from "../../styles/globalStyles";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal"; 
import CButton from '../Generals/CButton'

import { useSelector, useDispatch } from 'react-redux';
import Actions from '../../redux/actions';
import Toast from 'react-native-toast-message';

import ModalSelector from 'react-native-modal-selector'


const MainFilterComp = (props) => {  
  const [categoryList, setCategoryList] = useState( useSelector(state => state.productReducer.categories) );
  const [minPrice, setMinPrice] = useState(Number(0)); 
  const [maxPrice, setMaxPrice] = useState(Number(0));  
  const [selectedCatId, setSelectedCatId] = useState(''); 
  const onFilter = () => {
    let filterObj = {} 
    if( (Number(minPrice) != 0 || Number(maxPrice) != 0) && (Number(minPrice) >= Number(maxPrice))){ 
      Alert.alert(
        "Min tutar, Max tutardan büyük ve Boş bırakılamaz", 
      ); 
    }
    else
    { 
      if(Number(minPrice) != 0 || Number(maxPrice) !=0){
        filterObj.price = Number(minPrice) + '-' + Number(maxPrice)
      }   
    } 

    if(selectedCatId != '')
    {
      filterObj.category = selectedCatId.id
    } 
     
    props.onFiltered(filterObj);

  }


  const onFilterClear = () => {
    setMinPrice(null)
    setMaxPrice(null)
    setSelectedCatId('') 
  }

  return (
    <Modal style={[styles.modalContainer, ]}
      isVisible={props.visible}
      onBackdropPress={props.onDismiss}
    >
     
      <SafeAreaView style={[styles.container]}> 
        <View style={[styles.titleDiv]}>
          <Text style={[styles.title]}>Filtre</Text>
          <TouchableOpacity
            style={[styles.closeButton]}
            onPress={props.onDismiss}
          >
            <Icon name="close" size={30} color={globalStyles.Black800} /> 
          </TouchableOpacity>
        </View>

        <View style={[{ flexDirection: 'row', alignSelf: 'center', padding: 10 }]}>
            <TextInput  
                numberOfLines={1} 
                style={[globalStyles.input1, {}]}
                placeholder='Min Tutar'
                placeholderTextColor={globalStyles.Black500}
                value={minPrice} 
                onChangeText={(text) => { 
                  setMinPrice(text.replace(/[^0-9\.]+/g, ''));
                }} 
                keyboardType={"numeric"}
            /> 
            <TextInput  
                numberOfLines={1} 
                style={[globalStyles.input1, {}]}
                placeholder='Max Tutar'
                placeholderTextColor={globalStyles.Black500}
                value={maxPrice} 
                onChangeText={(text) => { 
                  setMaxPrice(text.replace(/[^0-9\.]+/g, ''));
                }} 
                keyboardType={"numeric"}
            /> 
            
        </View>

        <View style={[{ flexDirection: 'row', alignSelf: 'center', marginTop:15, padding: 10 }]}>

          <ModalSelector  
              data={categoryList}
              initValue="Kategoriler"
              keyExtractor= {item => item.id}
              labelExtractor= {item => item.categoryName}
              onChange={(e) => { setSelectedCatId(e) }}
          /> 
          
        </View>
            
        
        <View style={[{ flexDirection: 'row', position: 'absolute', bottom: 40, alignSelf: 'center' }]}>
          <CButton 
            title={'Sıfırla'}
            style={{marginRight: 10}} 
            onPress={(e) => { onFilterClear() }} 
          />
          <CButton 
            title={'Filtrele!'} 
            onPress={(e) => { onFilter() }} 
          />
        </View>
        
          
        </SafeAreaView> 
    </Modal>
  );
};
const styles = StyleSheet.create({ 
  modalContainer: {
    justifyContent: "flex-end", 
    margin:0,

  },
  container: {
    backgroundColor: "white",
    height: "80%",
    width: "100%",
    alignItems: "flex-end", 
    borderRadius:10,
    padding: 10,
  },
  input: {
    color: globalStyles.Black800,
    height: 50,
    fontSize: 22,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    width: "100%", 
  },
  flatList: {
    flex: 1,
    width: "95%",
    marginVertical: 10,
  },
  activityView: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
    justifyContent: "flex-end",
  },

  titleDiv: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },  

  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  }, 
});
export default MainFilterComp;