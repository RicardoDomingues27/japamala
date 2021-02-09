import React from 'react';
import Counter from '../Counter/indext';
import Footer from '../Footer';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import FabButton from '../SelectThemeButton/FabButton';

export default function ThemeColors(){
    const theme = 'colors';
    
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