import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Counter from '../Counter/indext';
import Footer from '../Footer';
import Header from '../Header';
import FabButton from '../SelectThemeButton/FabButton';

export default function ThemeBlack(){
    const theme = 'black';
    
    const fabProps = {
        navigation: useNavigation()
    }
    return(
        <>
             
            <Header theme={theme} />
           
            <Counter vibrationOn={false} theme ={theme}/>
            <FabButton {...fabProps}/>
            <Footer />
        </>
    );
}