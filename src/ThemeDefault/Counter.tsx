import React, {  useState } from 'react';
import {   Image, StyleSheet, Text,  Vibration, View } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import TimerField from './TimerField';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type Props = {
    onVibration: boolean;
    onTheme: string;
}

export default function Counter({onVibration, onTheme} : Props){
    const [counter, setCounter] = useState(0);
    
    const [startTime, setStartTime] = useState(false);
    const [stopTime, setStopTime] = useState(false);

    var [ isPress, setIsPress ] = React.useState(false);
    
    const ONE_SECOND_IN_MS = 1000;

    const handleSumCounter = (counter: number) =>{
        console.log("Vibration está ativo: "+onVibration)
       
        if(counter < 50) {
            setCounter(counter+1);
            onVibration ? Vibration.vibrate(80) : '';     
            !startTime ? setStartTime(true): '';      
        }else{            
            Vibration.vibrate(1200);
            !stopTime ? setStopTime(true): '';  
            setCounter(0);
        }
    }
    var touchProps = {
        activeOpacity: 1,
        underlayColor: '',
        style: isPress ? styles.touchIsPress : styles.touchIsNotPress,
        onPress: () => handleSumCounter(counter),
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true)        
      };

    return(
        <>
            <View style={(onTheme == 'Black') ? styles.containerBlack : styles.container}>
                <TimerField onStart={startTime} onStop={stopTime}/>
                <Text style={styles.counter}>{counter}</Text>
                <TouchableHighlight              
                    {...touchProps}>
                    <Image
                        source={require('../../assets/imageButtonJapamala.png')} 
                        style={styles.imageButtonJapamala} />
                </TouchableHighlight> 
            </View>
            
        </>    
    );
}

const styles = StyleSheet.create({
    container:{
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
      
    },
    containerBlack:{
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#000',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    counter:{
        fontFamily: 'OpenSans_700Bold',
        marginTop: 30,
        fontSize:90,
        color: '#000',
        opacity:0.75
    },

    touchIsNotPress:{
        
        marginTop: 10,
        width:screenWidth,
        height:400 ,
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    touchIsPress:{
        marginTop: 10,
        width:screenWidth,
        height:400,
        justifyContent: 'flex-start',
        alignItems: 'center',
        opacity: 0.5
    },
    imageButtonJapamala:{
        width: 350,
        height:380,
        opacity: 1
    },

    
    

});

