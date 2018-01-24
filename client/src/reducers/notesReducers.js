const dotProp = require('dot-prop-immutable');

const notesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        action.payload,
      ];
    case 'SET_NOTES':
      return action.payload;
    case 'SET_CURRENT_NOTE':
      return state.find(note => note.id === action.payload.id);
    default:
      return state;
  }
};

const notesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        }
      };
    case 'SET_NOTES':
      const notesById = action.payload.reduce((notes, note) => {
        notes[note.id] = note;
        return notes;
      }, {});
      return {
        byId: notesById,
      };
    case 'SET_CURRENT_NOTE':
      return {
        ...state,
        selectedNote: action.payload.id,
      }
    case 'DELETE_NOTE':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
}