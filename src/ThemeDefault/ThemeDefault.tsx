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
import BellButton from './BellButton';
import TimerButton from './TimerButton';

export default function ThemeDefault(){
    const isFocused = useIsFocused();
    const [theme, setTheme] = useState('White');
    const [vibration, setVibration] = useState(true);
    const [timer, setTimer] = useState(true);

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
        //getTheme();
        setTheme('White');
      }
    },[isFocused])   


    const handleChangeTheme = (theme: string) =>{
        setTheme(theme);
    }
    const handleOnVibration = (vibration: boolean) =>{
        setVibration(vibration);
    }
    const handleOnTimer = (timer: boolean) =>{
      setTimer(timer);
  }
    //<FabButton onTheme={handleChangeTheme}/>
    return(
        <>
             
            <Header onTheme={theme} />           
            <Counter onVibration={vibration} onTheme ={theme} onTimer={timer}/>            
            <VibrationButton onVibration={handleOnVibration}/>
            <BellButton onVibration={handleOnVibration}/>
            <TimerButton onTimer={handleOnTimer}/>
            <Footer />
        </>
    );
}