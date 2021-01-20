import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, Text } from 'react-native';

export default function SwitchTheme(){
    const navigation = useNavigation();
    const isFocused = useIsFocused();

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
            }else{
              navigation.navigate('ThemeColors'); 
            }
        }catch(e){
            Alert.alert("Error: ",e)
        }
      }

    useEffect(()=>{
      if(isFocused){
          getData();
      }
    },[isFocused])
    
    return (
        <Text> Carregando tema</Text>
    );
}
