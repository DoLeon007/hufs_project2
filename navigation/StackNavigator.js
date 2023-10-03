import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Route } from 'react-router-dom';

import WelcomeScreen from '../screens/WelcomeScreen';
import MainScreen from '../screens/MainScreen';
import LoginHandlerScreen from '../screens/LoginHandlerScreen';
import KakaoWebView from '../screens/KakaoWebView';

const Stack = createStackNavigator();
const StackNavigator = () =>{
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "white",
                    borderBottomColor: "white",
                    shadowColor: "white",
                    height:100
                },
                headerTintColor: "#000",
                headerBackTitleVisible: false
            }}
        >
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
            <Stack.Screen name="KakaoWebView" component={KakaoWebView}/>
            <Stack.Screen name="LoginHandlerScreen" component={LoginHandlerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
export default StackNavigator;