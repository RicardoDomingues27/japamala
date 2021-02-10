import React, { useState } from 'react';
import Counter from './Counter';
import Footer from '../Footer';
import Header from '../Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FabButton from './FabButton';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoundIconButton from './RoundIconButton';

export default function ThemeDefault(){
    const isFocused = useIsFocused();
    const [theme, setTheme] = useState('colors');
    const [vibration, setVibration] = useState(true);

    const getTheme = async() =>{
        try{
            const theme = await AsyncStorage.getItem('@theme');
            console.log('carregou tema: '+ theme)
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
      console.log("focou.");
      if(isFocused){
        getTheme();
      }
    },[isFocused])   


    const handleChangeTheme = (t: string) =>{
        console.log('Alterou tema para '+t)
        setTheme(t);
    }
    const handleOnVibration = (v: boolean) =>{
        console.log("Vibration : "+v);
        setVibration(v);
    }

    return(
        <>
             
            <Header onTheme={theme} />           
            <Counter onVibration={vibration} onTheme ={theme}/>
            <FabButton onTheme={handleChangeTheme}/>
            <RoundIconButton onVibration={handleOnVibration}/>
            <Footer />
        </>
    );
}