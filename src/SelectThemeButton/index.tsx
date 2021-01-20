import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Dimensions, Platform, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons'; 

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

type Props ={
    theme: string;
}

export default function SelectThemeButton( {theme}:Props){
    const navigation = useNavigation();
    const saveTheme = async  (theme: string) =>{
        try{
            await AsyncStorage.setItem('@theme', theme);
           
            switch(theme) {
                case 'white':  
                    navigation.navigate('ThemeWhite');
                  break;
                case 'black':
                    navigation.navigate('ThemeBlack');
                  break;
                default:  
                    navigation.navigate('ThemeColors');    
              }
        }catch(e){
            Alert.alert("Error: ", e);
        }
    } 
    
    return (
        <View style={styles.selectTheme}>
            <RNPickerSelect                        
                onValueChange={(theme) => saveTheme(theme)}                
                value={theme}
                style={pickerStyle}
                placeholder={{ label: 'Colors', value: 'colors' }}
                items={[                                               
                    { label: 'White', value: 'white' },
                    { label: 'Black', value: 'black' }
                ]}
                Icon={() => {
                    return  <AntDesign name="downcircle" size={24} color="green" />;
                  }}
                
            />
        </View>
    );

}

const styles = StyleSheet.create({
    
    selectTheme:{
        position: 'absolute',
        top: (screenHeight - 240),
        width: screenWidth,
        height: 200,
        borderColor:'#ddd',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 1,
        backgroundColor: '#ddd'        
    }
    

});
const pickerStyle = {
    
	inputIOS: {
		color: 'white',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
	},
	inputAndroid: {
        color: '#000' ,
      
	},
	placeholder:{color: '#000'} ,
	underline: { borderTopWidth: 0 },
	iconContainer: {
        right: 15,
        top: Platform.OS == "ios" ? 0 : 13
      }
};