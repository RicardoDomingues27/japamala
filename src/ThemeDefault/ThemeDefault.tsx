import React, { useState } from 'react';
import Counter from './Counter';
import Footer from '../Footer';
import Header from '../Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FabButton from './FabButton';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VibrationButton from './VibrationButton';

export default function ThemeDefault(){
    const isFocused = useIsFocused();
    const [theme, setTheme] = useState('colors');
    const [vibration, setVibration] = useState(true);

    const getTheme = async() =>{
        try{
            const theme = await AsyncStorage.getItem('@theme');
            
            if(theme !== null) {               
                switch(theme) {
                  case 'White':  
                    setTheme('White');
                    break;
                  case 'Black':
                    setTheme('Black');
                    break;
                  default:  
                    setTheme('Colors'); 
                }
            }else{
                setTheme('Colors'); 
            }
        }catch(e){
            Alert.alert("Error: ",e)
        }
      }

    useEffect(()=>{
      
      if(isFocused){
        getTheme();
      }
    },[isFocused])   


    const handleChangeTheme = (t: string) =>{
        setTheme(t);
    }
    const handleOnVibration = (v: boolean) =>{
        setVibration(v);
    }

    return(
        <>
             
            <Header onTheme={theme} />           
            <Counter onVibration={vibration} onTheme ={theme}/>
            <FabButton onTheme={handleChangeTheme}/>
            <VibrationButton onVibration={handleOnVibration}/>
            <Footer />
        </>
    );
}