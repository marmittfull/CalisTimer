import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import HomeScreen from './src/screens/HomeScreen'
import EMOMScreen from './src/screens/EMOMScreen'

const StackNavigator = createStackNavigator({
  'Home': HomeScreen,
  'EMOM': EMOMScreen
}, { initialRouteName: 'EMOM' })

export default createAppContainer(StackNavigator)
  
 
const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  text:{
    fontFamily: 'Ubuntu-Bold',
    fontSize: 48
  }
});