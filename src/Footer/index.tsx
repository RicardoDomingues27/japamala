
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
        <AdMobBanner
            style={styles.bannerAdmob}
            bannerSize="fullBanner"
            //adUnitID="ca-app-pub-1588032187629830/5260547849"             
            adUnitID="xxx"             
            servePersonalizedAds={false}
            onDidFailToReceiveAdWithError={(error) => console.log("AdMob error: "+error)} />
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
        zIndex:2
    },
});