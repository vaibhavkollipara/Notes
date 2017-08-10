import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  ScrollView,
  Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';

import * as noteActions from '../actions/noteActions';

const window = Dimensions.get("window");

class NotesList extends Component {

  constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            notesDataSource: ds
        };

  }

  componentWillMount(){
    this.props.fetchNotes();
  }

  componentDidMount(){
        this.setState({
              notesDataSource : this.state.notesDataSource.cloneWithRows(this.props.notesData.notes)
            });
  }

    componentWillReceiveProps(nextProps) {
          if (nextProps.notesData !== this.props.notesData) {
            this.setState({
              notesDataSource : this.state.notesDataSource.cloneWithRows(nextProps.notesData.notes)
            });
            noteActions.saveData(nextProps.notesData.notes);
          }
    }

    renderRow(note,sectionId, rowId, highlightId){
    return(
          <TouchableOpacity onPress={() => {alert(note.title+" : "+note.content);}} style={styles.item}>
            <View style={styles.item}>
                  <View style={styles.itemTitle}>
                    <Text>{note.title}</Text>
                  </View>
                  <View style={styles.itemDelete}>
                    <TouchableOpacity style={{backgroundColor: 'red',borderRadius: 10,padding:10}} onPress={() => {this.props.deleteNote(note.id)}} >
                      <Text>delete</Text>
                    </TouchableOpacity>
                  </View>
            </View>
          </TouchableOpacity>
      );
  }

  render() {

    if(this.props.notesData.fetching){
        return (
            <View style={styles.container}>
                <Text>Loading....</Text>
            </View>
        );
    }else if(this.props.notesData.error!==null){
        return (
            <View style={styles.container}>
                <Text>{this.props.notesData.error}</Text>
            </View>
        );
    }else{
        return (
                <View style={styles.container}>
                  <ListView
                        contentContainerStyle={{
                                                flexDirection: 'row',
                                                flexWrap : 'wrap',
                                                alignItems:'center',
                                                justifyContent: 'center'}}
                        dataSource = {this.state.notesDataSource}
                        renderRow = {this.renderRow.bind(this)}
                    />
                    </View>
        );
    }
  }
}

const styles = StyleSheet.create({
    container:{
        flex:2,
        flexDirection:'row',
        flexWrap:'wrap'
    },
  item : {
    margin:10,
    backgroundColor:'cyan',
    flexDirection : 'row',
    justifyContent : 'space-around',
    borderRadius: 10,
    width : (window.width /3)+20,
    minHeight : 50
},
  itemTitle : {
    flex:1,
    height:null,
    alignItems:'center',
    justifyContent: 'center'
  },
  itemDelete : {
    flex:1,
    height:null,
    alignItems:'center',
    justifyContent: 'center'
  }
});

function mapStateToProps(state){
  return {
    notesData : state.notesData
  };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
                fetchNotes : noteActions.fetchNotes,
                updateNote : noteActions.updateNote,
                deleteNote : noteActions.deleteNote
            },dispatch);
}

AppRegistry.registerComponent('NotesList', () => NotesList);

export default connect(mapStateToProps,mapDispatchToProps)(NotesList);
