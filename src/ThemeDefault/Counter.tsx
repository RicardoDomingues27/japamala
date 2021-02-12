import React, {  useState } from 'react';
import {   Image, StyleSheet, Text,  Vibration, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import TimerField from './TimerField';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let heightImage = 400;

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
               
        if(counter < 10) {
            setCounter(counter+1);
            onVibration ? Vibration.vibrate(80) : '';     
            !startTime ? setStartTime(true): '';   
            setStopTime(false);   
        }else{            
            Vibration.vibrate(1200);
            stopTime == false ? setStopTime(true): '';
            setStartTime(false) ;            
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

     const handleResetTimer = ()=>{
         console.log('reset timer pelo counter');

         setStartTime(false) ;  
         setStopTime(false);          
         setCounter(0);
     } 
     const selectTheme = (theme: string) =>{
        
        switch(theme){
            case 'Black':
                return (<View style={styles.containerBlack}>                
                            <Text style={styles.counterBlack}>{counter}</Text>
                            <TouchableHighlight              
                                {...touchProps}>
                                <Image
                                    source={require('../../assets/imageButtonJapamalaBlack.png')} 
                                    style={styles.imageButtonJapamalaBlack} />
                            </TouchableHighlight>
                        </View>     );
                break;
            case 'White':                
                return (<View style={styles.containerBlack}>                
                            <Text style={styles.counter}>{counter}</Text>
                            <TouchableHighlight              
                                {...touchProps}>
                                <Image
                                    source={require('../../assets/imageButtonJapamalaWhite.png')} 
                                    style={styles.imageButtonJapamalaBlack} />
                            </TouchableHighlight>
                        </View>     );
                break;
            default:
                return (<View style={styles.containerBlack}>                
                            <Text style={styles.counter}>{counter}</Text>
                            <TouchableHighlight              
                                {...touchProps}>
                                <Image
                                    source={require('../../assets/imageButtonJapamalaColors.png')} 
                                    style={styles.imageButtonJapamalaBlack} />
                            </TouchableHighlight>
                        </View>     );    
        }
    }
    
    return(
        <>
            <TimerField  onStart={startTime} onStop={stopTime} onReset={handleResetTimer}/>
            {selectTheme(onTheme)}
        </>    
    );
}

const styles = StyleSheet.create({
    containerColors:{
        width: screenWidth,
        height: screenHeight,
        justifyContent: 'flex-start',
        alignItems: 'center',
      
        zIndex:1
    },
    containerBlack:{
        marginTop:-100,
        width: screenWidth,
        height: screenHeight,        
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex:1
    },
    containerWhite:{
        width: screenWidth,
        height: screenHeight,
        
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex:1
    },
    counter:{
        fontFamily: 'OpenSans_400Regular',
        marginTop: -20,
        fontSize:90,
        color: '#000',
        opacity:0.75
    },
    counterBlack:{
        position:'absolute',
        fontFamily: 'OpenSans_400Regular',
        marginTop: 300,
        fontSize:90,
        color: '#fff',
        zIndex:2
    },
    touchIsNotPress:{        
        marginTop: 0,
        width:screenWidth,
        height: heightImage ,
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    touchIsPress:{
        marginTop: 0,
        width:screenWidth,
        height: heightImage,
        justifyContent: 'flex-start',
        alignItems: 'center',
        opacity: 0.5
    },
    imageButtonJapamala:{
        width: screenWidth-80,
        height:screenWidth-60,
        zIndex:0
        
    },
    imageButtonJapamalaBlack:{
        marginTop:70,
        width: screenWidth,
        height:screenWidth,
        bottom:0,
        zIndex:0
        
    },
    
    
    

});

