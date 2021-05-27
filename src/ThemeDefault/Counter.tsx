import React, {  useEffect, useState } from 'react';
import {   Platform , Image, StyleSheet, Text,  Vibration, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Dimensions , PixelRatio} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';

import TimerField from './TimerField';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type Props = {
    onVibration: boolean;
    onTheme: string;
    onTimer: boolean;
}

export default function Counter({onVibration, onTheme, onTimer} : Props){
    const [counter, setCounter] = useState(0);
    
    const [startTime, setStartTime] = useState(false);
    const [stopTime, setStopTime] = useState(false);
    const [resetTimer,setResetTimer] = useState(false);

    var [ isPress, setIsPress ] = React.useState(false);
    
    const ONE_SECOND_IN_MS = 1000;

    const handleSumCounter = (counter: number) =>{
               
        if(counter < 108) {
            setResetTimer(false);
            setCounter(counter+1);
            onVibration ? Vibration.vibrate(80) : '';     
            !startTime ? setStartTime(true): '';   
            setStopTime(false);   
            
        }else{            
            Vibration.vibrate(1500);            
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
         setResetTimer(true);
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
                return (<View style={styles.containerWhite}> 
                            <TouchableHighlight              
                                {...touchProps}>         
                                <View>     
                                <Text style={styles.counterBlack}>{counter}</Text>                            
                                <Image
                                    source={require('../../assets/imageButtonJapamalaWhite.png')} 
                                    style={styles.imageButtonJapamalaWhite} />
                                </View>     
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
    const tocarSino  = async() =>{
        try {
            const {
              sound: soundObject,
              status,
            } = await Audio.Sound.createAsync(require('../../assets/sino.mp3'), { shouldPlay: true });
            // Your sound is playing!
          } catch (error) {
            // An error occurred!
          }    
    }


    return(
        <>
            <TouchableOpacity 
                style={onTimer ? styles.timer : styles.timerHidden}
                onPress={handleResetTimer}>
                   
                <TimerField  onStart={startTime} onStop={stopTime} onReset={resetTimer} />
            </TouchableOpacity>
            
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
        position: 'absolute',
        marginTop:140,
        width: screenWidth,
        height: screenHeight,        
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex:1,
        backgroundColor:'#A6CFD5'
        
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
        marginTop:  Platform.OS === 'ios' ? 180 : 175,
        marginLeft: (screenWidth/2)-20,
        fontSize: Platform.OS === 'ios' ? 64 : 60,
        color: '#444',
        zIndex:2,
        backgroundColor:'#fff',
        width:140,
        height:140,
        paddingTop:24,
        textAlign: 'center',
        borderRadius:70,
        borderWidth:3,
        borderColor:'#769397',
        overflow:'hidden'

    },
    touchIsNotPress:{        
        marginTop: 0,
        width:screenWidth,
        height: 500 ,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1
    },
    touchIsPress:{
        marginTop: 0,
        width:screenWidth,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex:1
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
    imageButtonJapamalaWhite:{
        marginTop:0,
        width: screenWidth +100,
        height:screenWidth +100,
        
        bottom:0,
        zIndex:0
    },
    timer:{         
          marginTop:-60,   
          marginLeft:screenWidth-105,
          width:120,
          height:40,
          backgroundColor:'#fff',
          padding: Platform.OS === 'ios' ? 7 : 5,
          paddingLeft:15,
          zIndex:2,    
          borderRadius:30,
          borderWidth:4,
          borderColor:'#ccc'
      },
      timerHidden:{
          width:0,
          height:0
      }

    
    

});

