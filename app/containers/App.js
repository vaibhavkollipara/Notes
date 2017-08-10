
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


import NotesList from './NotesList';
import NotesList2 from './NotesList2';
import NewNote from './NewNote';



export default class App extends Component {


  render() {

        return (
            <View style={styles.container}>
                  <NotesList />
                  <NewNote />
            </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFFFFF',
    flexDirection:'column',
    margin:5
  }
});

AppRegistry.registerComponent('App', () => App);
