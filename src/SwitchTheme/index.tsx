import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';

export default function SwitchTheme(){
    const navigation = useNavigation();

    const getData = async() =>{
        try{
            const theme = await AsyncStorage.getItem('@theme');
            if(theme !== null) {               
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
            }
        }catch(e){
            Alert.alert("Error: ",e)
        }
      }
    useEffect(()=>{
        console.log('chamou o getData')
        getData();
    },[]);
    
    return (
        <>

        </>
    );
}
