import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

type Props ={
    theme: string;
}
export default function Header({theme}: Props){
    const selectTheme = (theme: string) =>{
        
        switch(theme){
            case 'black':
                return styles.containerBlack;
                break;
            case 'white':
                return styles.containerWhite;
                break;
            default:
                return styles.containerColors;    
        }
    }
    return(
        <View 
            style={selectTheme(theme)}           >
            <Text style={styles.text}>Japamala</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerColors:{
        marginTop:0,
        height: 110,
        paddingTop:15,
        backgroundColor: '#077CE9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerBlack:{
        marginTop:0,
        height: 110,
        paddingTop:15,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerWhite:{
        marginTop:0,
        height: 110,
        paddingTop:15,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize:48,
        color: '#fff',
        fontFamily: 'OpenSans_400Regular',
    },
    theme:{

         backgroundColor: '#333',

    }
});