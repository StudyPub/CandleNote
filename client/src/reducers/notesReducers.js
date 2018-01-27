const dotProp = require('dot-prop-immutable');

const defaultState = {
  byId: {},
  currentNote: -1,
  allIds: [],
};

const notesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload,
        },
      };
    case 'SET_NOTES': {
      const notesById = action.payload.reduce((notes, note) => ({
        ...notes,
        [note._id]: note,
      }), {});
      return { byId: notesById };
    }
    case 'SET_CURRENT_NOTE':
      return {
        ...state,
<<<<<<< HEAD
        currentNote: action.payload._id,
=======
        currentNote: state.byId[action.payload.id],
>>>>>>> master
      };
    case 'DELETE_NOTE':
      return dotProp.delete(state, `byId.${action.payload._id}`);
    default:
      return state;
  }
};

export default notesReducer;
