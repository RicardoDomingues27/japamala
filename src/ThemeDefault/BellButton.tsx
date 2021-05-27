import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Alert } from "react-native";
import { Vibration } from "react-native";
import { TouchableOpacity , Image , StyleSheet ,Dimensions} from "react-native";


const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
type Props = {
    onBell: (bell: boolean) => void;
}

export default function BellButton({onBell}: Props){
    const [bell, setBell] = useState(true);
    const isFocused = useIsFocused();
   

    const getBell = async() =>{
        try{
            const bell = await AsyncStorage.getItem('@playBellJapamala');
            
            if(bell !== null) {    
                let bellState = JSON.parse(bell)      ;
                setBell(bellState)
                onBell(bellState)  
            }else{
                setBell(true); 
            }
        }catch(e){
            Alert.alert("Error: ",e);
        }
      }


  const saveBell = async  (bellData: boolean) =>{
    try{
        await AsyncStorage.setItem('@playBellJapamala', JSON.stringify(bellData));
        
    }catch(e){
        Alert.alert("Error: ", e);
    }
}     
    useEffect(()=>{
      
      if(isFocused){
        getBell();
      }
    },[isFocused]) 
    
    const handleOnPress = () =>{
        
        const statusBell = !bell;
        setBell(statusBell);
        onBell( statusBell);
        saveBell(statusBell);
        statusBell ?  Vibration.vibrate() : '';
    }

    return(
        <TouchableOpacity 
            style={bell ?  styles.button : styles.buttonDisable} 
            onPress={handleOnPress}> 
            <Image        
            style={{height:45, width:45}}     
            source={require('../../assets/bell-white.png')} /> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        position: 'absolute',
        bottom: 70,
        marginLeft:(screenWidth/2)-25,
        padding:5,
        width: 55,
        height: 55,
        backgroundColor: '#A6CFD5',
        borderRadius: 100,
        transform: [{ rotate: '-30deg' }],
        
        zIndex:1
    },
    buttonDisable:{
        position: 'absolute',
        bottom:70,
        marginLeft:(screenWidth/2)-25,
        padding:5,
        width: 55,
        height: 55,
        backgroundColor: '#ccc',
        
        borderRadius: 100,
        transform: [{ rotate: '-60deg' }],
        
        zIndex:1
    }

});