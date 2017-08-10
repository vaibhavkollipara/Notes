import { combineReducers } from 'redux';

import notesReducer from './noteReducer';

export default combineReducers({
    notesData : notesReducer,
});
