import {
  AsyncStorage
} from 'react-native';

let id_generator = 0;

export function fetchNotes(){
    return (dispatch,getState) => {
        dispatch({type:"FETCH_NOTES",payload:{}});

        AsyncStorage.getItem('notes')
                    .then((value) => {
                        if(value!==null){
                            dispatch({type: "FETCH_NOTES_FULLFILLED",payload: JSON.parse(value) });
                        }else{
                            dispatch({type: "FETCH_NOTES_FULLFILLED",payload: [] });
                        }
                    }).catch(() =>{
                        dispatch({type: "FETCH_NOTES_FAILED",payload:"Problem Fetching Notes..."});
                    } );
        AsyncStorage.getItem('idGenerator')
                    .then((value) => {
                        if(value!==null){
                            id_generator = parseInt(value);
                        }else{
                            id_generator = 1;
                        }
                    });

    }
}

export function addNote(note){

    return (dispatch,getState) => {
        note['id'] = id_generator++;
        dispatch({type : "ADD_NOTE", payload : note});
    }
}

export function updateNote(note){
    return {
        type: updateNote,
        payload : note
    };
}

export function deleteNote(noteId){
    return {
        type : "DELETE_NOTE",
        payload : noteId
    }
}

export function saveData(notes){
    AsyncStorage.setItem("notes",JSON.stringify(notes));
    AsyncStorage.setItem("idGenerator",id_generator.toString());

}
