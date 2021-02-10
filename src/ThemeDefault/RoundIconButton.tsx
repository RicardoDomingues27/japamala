import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Alert } from "react-native";
import { Vibration } from "react-native";
import { TouchableOpacity , Image , StyleSheet ,Dimensions} from "react-native";

const screenHeight = Dimensions.get('window').height;
type Props = {
    onVibration: (vibration: boolean) => void;
}

export default function RoundIconButton({onVibration}: Props){
    const [vibration, setVibration] = useState(true);
    const isFocused = useIsFocused();
    
    const getVibration = async() =>{
        try{
            const vibration = await AsyncStorage.getItem('@vibration');
            console.log('carregou vibration: '+ vibration)
            if(vibration !== null) {    
                let vibrationState = JSON.parse(vibration)      ;
                setVibration(vibrationState)
                onVibration(vibrationState)  
            }else{
                setVibration(true); 
            }
        }catch(e){
            Alert.alert("Error: ",e);
        }
      }

      
  const saveVibration = async  (vibrationData: boolean) =>{
    try{
        await AsyncStorage.setItem('@vibration', JSON.stringify(vibrationData));
        console.log(vibrationData + " Gravado no dispostivo");        
    }catch(e){
        Alert.alert("Error: ", e);
    }
}     
    useEffect(()=>{
      console.log("focou.");
      if(isFocused){
        getVibration();
      }
    },[isFocused]) 
    const handleOnPress = () =>{
        const v = !vibration;
        setVibration(v);
        onVibration( v);
        saveVibration(v);
        v ?  Vibration.vibrate() : '';
    }

    return(
        <TouchableOpacity 
            style={vibration ?  styles.button : styles.buttonDisable} 
            onPress={handleOnPress}> 
            <Image        
            style={{height:45, width:45}}     
            source={require('../../assets/ic_vibrate_white_48dp.png')} /> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        position: 'absolute',
        marginTop: screenHeight-127,
        marginLeft:10,
        padding:5,
        width: 55,
        height: 55,
        backgroundColor: '#03a9f4',
        borderRadius: 100,
        transform: [{ rotate: '-30deg' }],
        
    },
    buttonDisable:{
        position: 'absolute',
        marginTop: screenHeight-127,
        marginLeft:10,
        padding:5,
        width: 55,
        height: 55,
        backgroundColor: '#ccc',
        
        borderRadius: 100,
        transform: [{ rotate: '-60deg' }],
        elevation: 1,
    }

});