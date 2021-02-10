import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ThemeDefault from './ThemeDefault/ThemeDefault';

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
                <Stack.Screen name="ThemeDefault" component={ThemeDefault}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}       