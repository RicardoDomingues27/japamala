
import {
    AdMobBanner
  } from 'expo-ads-admob';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;

export default function Footer(){
    return (
        <>
        <LinearGradient colors={['#fff', '#4B0082']}
            style={styles.container}>

        </LinearGradient>
        <AdMobBanner
            style={styles.bannerAdmob}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-3940256099942544/6300978111" 
            
            servePersonalizedAds 
            onDidFailToReceiveAdWithError={(error) => console.log(error)} />
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:0,
        height:210,
        width:screenWidth,       
        zIndex:0
    },
    bannerAdmob:{
        position:'absolute',
        bottom:0,
        width: screenWidth,
        zIndex:0
        

        
    },
});