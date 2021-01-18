import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

type Props ={
    theme: string;
}

export default function SelectTheme( {theme}:Props){
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
                
            />
        </View>
    );

}

const styles = StyleSheet.create({
    
    selectTheme:{
        width: screenWidth,
        height: 100,
        borderColor:'#f00',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 1,
        backgroundColor: '#f00'        
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
	
};
