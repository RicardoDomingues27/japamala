import React, { useState , useRef, useEffect} from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

type Props = {
    onStart: boolean;
    onStop: boolean;
}

export default function TimerField({onStart, onStop}: Props ){
  const [timer, setTimer] = useState(0);
  const [startedTimer, setStartedTime] = useState(false);
  const [stopedTimer, setStopedTime] = useState(false);


  var increment: NodeJS.Timeout | null = null;

  const handleStart = () => { 
    onStart = false;
    console.log(onStart);
    increment = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
    
  }
  const handlePause = () => {
    console.log('handlePause ok ['+increment+']')
    if (increment != null) {
      console.log('handlePause ok')
      clearInterval(increment);
      increment = null;
    }
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  }

  useEffect(() =>{
    if(!startedTimer && onStart){
      setStartedTime(onStart);
      handleStart();
    }
    if(!stopedTimer && onStop){
      setStopedTime(onStop);
      console.log('pausando o timer');
      handlePause();
    }
    
  });  

  return (
      <View>
          <Text>{formatTime()}</Text>
          
      </View>
  )
  
}
