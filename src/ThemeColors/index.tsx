import React from 'react';
import Counter from '../Counter/indext';
import Footer from '../Footer';
import Header from '../Header';

export default function ThemeColors(){
    const theme = 'colors';
    return(
        <>
            <Header theme={theme} />
            <Counter vibrationOn={false} theme ={theme}/>
            <Footer />
        </>
    );
}