import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Router from './src/Router';
import NavigationService from './src/Components/NavigationService'
export default class App extends Component {
  
  render() {
    return (     
        <Router
          ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        
        />     
    )
  }
}
