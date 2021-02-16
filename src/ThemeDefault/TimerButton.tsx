import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Alert } from "react-native";
import { TouchableOpacity , Image , StyleSheet ,Dimensions} from "react-native";

const screenHeight = Dimensions.get('screen').height;
type Props = {
    onTimer: (timer: boolean) => void;
}

export default function TimerButton({onTimer}: Props){
    const [timer, setTimer] = useState(true);
    const isFocused = useIsFocused();
    
    const getTimer = async() =>{
        try{
            const timer = await AsyncStorage.getItem('@timer');
            
            if(timer !== null) {    
                let timerState = JSON.parse(timer)      ;
                setTimer(timerState)
                onTimer(timerState)  
            }else{
                setTimer(true); 
            }
        }catch(e){
            Alert.alert("Error: ",e);
        }
      }
    
      
  const saveTimer = async  (timerData: boolean) =>{
    try{
        await AsyncStorage.setItem('@timer', JSON.stringify(timerData));        
    }catch(e){
        Alert.alert("Error: ", e);
    }
    
}     
    useEffect(()=>{
      
      if(isFocused){
        getTimer();
      }
    },[isFocused]) 
    
    const handleOnPress = () =>{
        const t = !timer;
        setTimer(t);
        onTimer(t);
        saveTimer(t);
        
    }

    return(
        <TouchableOpacity 
            style={timer ?  styles.button : styles.buttonDisable} 
            onPress={handleOnPress}> 
            <Image        
            style={{height:45, width:45}}     
            source={timer 
                ? require('../../assets/timer-sand.png')
                : require('../../assets/timer-sand-full.png')} /> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        position: 'absolute',
        bottom: 70,
        right:10,
        padding:5,
        width: 55,
        height: 55,
        backgroundColor: '#A6CFD5',
        borderRadius: 100,
        transform: [{ rotate: '30deg' }],        
        zIndex:1
    },
    buttonDisable:{
        position: 'absolute',
        bottom: 70,
        right:10,
        padding:5,
        width: 55,
        height: 55,
        backgroundColor: '#ccc',
        borderRadius: 100,
        transform: [{ rotate: '-30deg' }],        
        zIndex:1
    }

});