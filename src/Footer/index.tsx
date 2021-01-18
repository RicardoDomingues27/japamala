
import { AdMobBanner } from 'expo-ads-admob';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export default function Footer(){
    return (
        
        <AdMobBanner
            style={styles.bannerAdmob}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-3940256099942544/6300978111" 
            
            servePersonalizedAds 
            onDidFailToReceiveAdWithError={(error) => console.log(error)} />
    
    );
}

const styles = StyleSheet.create({
    
    bannerAdmob:{
        position:'absolute',
        marginTop:screenHeight -60
    },
});