const defaultState = {
    fetching : false,
    fetched : false,
    notes : [],
    error : null
};

export default (state=defaultState,action) => {
        switch(action.type){
            case "FETCH_NOTES":
                return {...state, fetching:true, error:null};
            case "FETCH_NOTES_FAILED":
                return {...state, fetching:false, error:action.payload};
            case "FETCH_NOTES_FULLFILLED":
                return {...state, fetching:false, notes:action.payload, error:null};
            case "ADD_NOTE":
                return {...state,notes : [...state.notes ,action.payload], error:null};
            case "UPDATE_NOTE" :
                const new_notes = {...state};
                const note_index = new_notes.findIndex(note => note.id == action.payload.id);
                new_notes[note_index].title = action.payload.title;
                new_notes[note_index.content] = action.payload.content;
                return {...state,notes: new_notes, error:null}
            case "DELETE_NOTE" :
                return {...state, notes : state.notes.filter(note => note.id != action.payload), error:null};
            default:
                return state;
        }
};
