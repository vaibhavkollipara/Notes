
import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {Provider} from 'react-redux';

import store from './app/store';
import App from './app/containers/App';


export default class Notes extends Component {

    constructor(){
        super();
    }

    componentDidMount(){

    }

  render() {
    return (
    <Provider store={store}>
      <App />
    </Provider>
    );
  }
}


AppRegistry.registerComponent('Notes', () => Notes);
