const dotProp = require('dot-prop-immutable');

const defaultState = {
  byId: {},
  currentFlashcard: -1,
  allIds: [],
};

const flashcardsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_FLASHCARD':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: action.payload,
        },
      };
    case 'SET_FLASHCARDS': {
      const cardsById = action.payload.reduce((cards, card) => ({
        ...cards,
        [card._id]: card,
      }), {});
      return { byId: cardsById };
    }
    case 'SET_CURRENT_FLASHCARD':
      return {
        ...state,
        currentFlashcard: action.payload._id,
      };
    case 'DELETE_FLASHCARD':
      return dotProp.delete(state, `byId.${action.payload._id}`);
    default:
      return state;
  }
};

export default flashcardsReducer;
