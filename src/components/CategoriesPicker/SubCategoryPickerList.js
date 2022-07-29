
import React, { useState, useEffect, memo } from "react";
import {
  View, 
  TextInput,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text
} from "react-native"; 

import SubCategoryPickerItem from "./SubCategoryPickerItem";
import globalStyles from "../../styles/globalStyles";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal"; 

import { useSelector, useDispatch } from 'react-redux';
import Actions from '../../redux/actions';

const SubCategoryPickerList = (props) => {  
  const list = useSelector(state => state.productReducer.subCategories); 
  const [categoryList, setCategoryList] = useState();
  const [loading, setLoading] = useState(false);   

  useEffect(() => { 
    setCategoryList(list.filter(x => x.mainCategoryId == props.getMainCategoryId ).map(x => x))
    return () => {
      
    }
  }, [props.getMainCategoryId])
  

const renderItem = (item) => (
    <SubCategoryPickerItem
      onPress={() => {
        props.onDismiss();
        props.onSubCategoryPress(item);
      }}
      key={item.id}
      name={ item.subCategoryName } 
    />
);
  

  return (
    <Modal key={'sub'} style={[styles.modalContainer]}
      isVisible={props.visible}
      onBackdropPress={props.onDismiss}
    >
     
      <SafeAreaView style={styles.container}> 
        <View style={[styles.titleDiv]}>
          <Text style={[styles.title]}>Alt Kategoriler</Text>
          <TouchableOpacity
            style={[styles.closeButton]}
            onPress={props.onDismiss}
          >
            <Icon name="close" size={30} color={globalStyles.Black800} /> 
          </TouchableOpacity>
        </View>
            
        {loading ? (
              <View style={styles.activityView}>
                <ActivityIndicator size="large" color={props.secondaryColor} />
              </View>
            ) : (
              
              <FlatList
                keyboardShouldPersistTaps="always"
                style={styles.flatList}
                keyExtractor={(item) => item.id}
                data={categoryList}  
                initialNumToRender={2} 
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={100}
                removeClippedSubviews={true}  
                  renderItem={({item}) => renderItem(item)}
              />
            )}

          
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
  }
});
export default memo(SubCategoryPickerList);