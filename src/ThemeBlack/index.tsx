import React from 'react';
import Counter from '../Counter/indext';
import Footer from '../Footer';
import Header from '../Header';

export default function ThemeBlack(){
    const theme = 'black';
    return(
        <>
            <Header theme={theme} />
            <Counter vibrationOn={false} theme ={theme}/>
            <Footer />
        </>
    );
}