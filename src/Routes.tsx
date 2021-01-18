import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ThemeColors from './ThemeColors';
import ThemeBlack from './ThemeBlack';
import ThemeWhite from './ThemeWhite';
import SwitchTheme from './SwitchTheme';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}>
                <Stack.Screen name="SwitchTheme" component={SwitchTheme}></Stack.Screen>
                
                <Stack.Screen name="ThemeBlack" component={ThemeBlack}></Stack.Screen>
                <Stack.Screen name="ThemeWhite" component={ThemeWhite}></Stack.Screen>
                <Stack.Screen name="ThemeColors" component={ThemeColors}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}       