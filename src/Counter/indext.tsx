import React, { useEffect, useState } from 'react';
import {   Image, StyleSheet, Text,  Vibration, View } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import SelectTheme from '../SelectThemeButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type Props = {
    vibrationOn: boolean;
    theme: string;
}

export default function Counter({vibrationOn, theme} : Props){
    const [counter, setCounter] = useState(0);
    const [vibration, setVibration] = useState(vibrationOn);
    
    var [ isPress, setIsPress ] = React.useState(false);
    const ONE_SECOND_IN_MS = 1000;

    const handleSumCounter = (counter: number) =>{
        if(counter < 10) {
            setCounter(counter+1);
            vibration ? Vibration.vibrate() : '';
           
        }else{            
            Vibration.vibrate(2 * ONE_SECOND_IN_MS);
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
            <View style={styles.container}>
                <Text style={styles.counter}>{counter}</Text>
                <TouchableHighlight              
                    {...touchProps}>
                    <Image
                        source={require('../../assets/imageButtonJapamala.png')} 
                        style={styles.imageButtonJapamala} />
                </TouchableHighlight> 
                <SelectTheme theme={theme} />                
            </View>
            
        </>    
    );
}

const styles = StyleSheet.create({
    container:{
        width: screenWidth,
        height: screenHeight- 200,
        backgroundColor: '#fff',
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

