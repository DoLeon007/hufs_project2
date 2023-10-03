import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'

export default function App() {

  console.disableYellowBox = true;

  return ( 
  <NavigationContainer>
    <StackNavigator/>
  </NavigationContainer>);
}