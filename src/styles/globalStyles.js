import { StyleSheet, Platform } from 'react-native'

const globalStyles = StyleSheet.create({
  MainBackgroundColor: '#f5f5f5',
  Blue1: '#007bff',
  Blue1_900: '#1f47cd',
  Blue1_700: '#1269ec',
  Blue1_600: '#008fff',
  Blue1_500: '#008fff',
  Blue1_400: '#1dadff',
  Blue1_300: '#56bdff',
  Blue1_200: '#8dd0ff',
  Blue1_100: '#bbe2ff',
  Blue1_50: '#e3f4ff',
  Blue2: '#00aeef',
  Blue1Rgb: '0, 123, 255',
  Blue2Rgb: '0, 174, 239', 
  Black: '#121212',
  Black800: '#323232',
  Black700: '#505050', 
  Black600: '#636363',
  Black500: '#8a8a8a',
  Black400: '#ababab',
  Black300: '#d0d0d0',
  Black200: '#d0d0d0',
  Black100: '#eeeeee',
  Black50: '#f7f7f7',
  row:{ 
    flexDirection: 'column',
    flex: 1,
  },
  col:{ 
    flexDirection: 'row',
    flex: 1
  },
  container: { 
    flex:1,
  }, 
  input1:{
    borderColor: '#eee',
    borderWidth: 2,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 5,
    height: 50,
    fontSize: 18,
    paddingLeft: 15, 
  },
  horizontalLine:{
    height:2, 
    backgroundColor: '#d0d0d0', 
    flex: 1
  },  

  
  elevate1: {
    ...Platform.select({
      ios: {
        shadowColor: '#8a8a8a',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  elevate2: {
    ...Platform.select({
      ios: {
        shadowColor: '#8a8a8a',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  elevate3: {
    ...Platform.select({
      ios: {
        shadowColor: '#8a8a8a',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  elevate4: {
    ...Platform.select({
      ios: {
        shadowColor: '#8a8a8a',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  customToastContainer: {
    width: '90%',
    backgroundColor: '#fff', 
    borderRadius:12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row', 
    zIndex: 100000000
  }
  
}); 

export default globalStyles
