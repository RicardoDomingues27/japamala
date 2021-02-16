import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props ={
    onTheme: string;
}

export default function Header({onTheme}: Props){
    
    const selectTheme = (theme: string) =>{
        
        switch(theme){
            case 'Black':
                return styles.containerBlack;
                break;
            case 'White':                
                return styles.containerWhite;
                break;
            default:
                return styles.containerColors;    
        }
    }
    const selectColor = (theme: string) =>{
        
        switch(theme){
            case 'Black':
                return ['#000', '#ffffff'];
                break;
            case 'White':                
                return ['#A6CFD5', '#A6CFD5'];
                break;
            default:
                return ['#077CE9', '#ffffff'];    
        }
    }

    return(
        <LinearGradient colors={selectColor(onTheme)}
            style={selectTheme(onTheme)}           >
            <Text style={onTheme != 'Colors' ? styles.textForBlack :styles.text}>Japamala</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    containerColors:{
        marginTop:0,
        height: 190,
        paddingTop:15,
        backgroundColor: '#077CE9',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerBlack:{
        marginTop:0,
        height: 190,
        paddingTop:15,
        backgroundColor: '#077CE9',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerWhite:{
        marginTop:0,
        height: 190,
        paddingTop:15,
        backgroundColor: '#ccc',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text:{
        marginTop:30,
        fontSize:Platform.OS == 'ios'? 34 : 30 ,
        color: '#444',
        fontFamily: 'OpenSans_700Bold',
    },
    textForBlack:{
        marginTop:48,
        fontSize:Platform.OS == 'ios'? 34 : 30 ,
        color: '#fff',
        fontFamily: 'OpenSans_400Regular',
    },
    theme:{

         backgroundColor: '#333',

    }
});