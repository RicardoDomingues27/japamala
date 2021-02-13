import React, { useState , useRef, useEffect} from 'react';
import { Dimensions } from 'react-native';
import { Text, TouchableOpacity ,StyleSheet} from 'react-native';


const screenWidth = Dimensions.get('window').width;


type Props = {
    onStart: boolean;
    onStop: boolean;
    onReset: () => void;
}
var increment: ReturnType<typeof setTimeout> ;

export default function TimerField({onStart, onStop, onReset}: Props ){
  const [timer, setTimer] = useState(0);
  const [startedTimer, setStartedTime] = useState(false);
  const [stopedTimer, setStopedTime] = useState(false);

  const handleStart = () => { 
    onStart = false;    
    increment  = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)    
  }
  const handlePause = () => {
    console.log('reset timer '+formatTime() +' = '+ increment);
    (increment !== null)&&(clearInterval(increment))
    setStopedTime(false);
    setStartedTime(false);
    onStop = false;
    onStart = false;
  }

  const handleReset = () => {
    handlePause();
    onReset();
    setTimer(0);
  }
  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  }

  useEffect(() =>{
    
    if(startedTimer == false && onStart == true){
      setTimer(0)
      setStartedTime(true);
      handleStart();
    }
    if(stopedTimer == false && onStop == true){      
      handlePause();
    }    
  });  

  return (
      <TouchableOpacity 
        style={styles.timer}
        onPress={handleReset}>
          <Text style={{fontSize:14 ,fontWeight:'700', elevation:5}}>{formatTime()}</Text>          
      </TouchableOpacity>
  )
  
}

const styles = StyleSheet.create({
  timer:{         
    marginTop:-60,   
    marginLeft:screenWidth-105,
    width:120,
    height:40,
    backgroundColor:'#fff',
    padding: 5,
    paddingLeft:15,
    zIndex:1,    
    borderRadius:30,
    borderWidth:4,
    borderColor:'#ccc'
}
});

