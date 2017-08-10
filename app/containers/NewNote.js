import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as noteActions from '../actions/noteActions';

const window = Dimensions.get('window');

class NewNote extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            content: ''
        };
    }

    onChangeTitle(value){
        this.setState({
            title : value
        });
    }

    onChangeDesc(value){
        this.setState({
            content : value
        });
    }

    addNew(){
        let note = {
            title : this.state.title.toUpperCase(),
            content : this.state.content
        };

        this.props.addNote(note);
        this.setState({
            title : '',
            content : ''
        });
    }

    render(){
        return(
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center',justifyContent : 'center'}}>
                <TextInput
                    style={styles.item}
                    placeholder="Enter Title"
                    value={this.state.title}
                    onChangeText = {(value) => this.onChangeTitle(value)}
                />
                <TextInput
                    style={styles.item}
                    placeholder="Enter Description"
                    value={this.state.content}
                    onChangeText = {(value) => this.onChangeDesc(value)}
                />
                    <TouchableOpacity style={styles.button}  onPress={() => {this.addNew()}}>
                        <Text style={styles.buttonText} >Add Note</Text>
                    </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        flexDirection:'column',

    },
    item : {
        flex:1,
        marginLeft:15,
        marginRight:15,
        width : window.width * 0.75
    },
    button:{
        flex:1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:15,
        width : window.width /2,
    },
    buttonText:{
        fontSize:15,
        padding:20,
        color:'white'
    }
});


function mapStateToProps(state){
  return {

  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                addNote : noteActions.addNote,
            },dispatch);
}


AppRegistry.registerComponent('NewNote', () => NewNote);

export default connect(mapStateToProps,mapDispatchToProps)(NewNote);
