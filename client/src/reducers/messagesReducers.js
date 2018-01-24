const dotProp = require('dot-prop-immutable');

const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        }
      };
    case 'SET_MESSAGES':
      const messagesById = action.payload.reduce((messages, message) => {
        messages[message.id] = message;
        return messages;
      }, {});
      return {
        byId: messagesById,
      };
    case 'SET_CURRENT_MESSAGE':
      return {
        ...state,
        selectedMessage: action.payload.id,
      }
    case 'DELETE_MESSAGE':
      return dotProp.delete(state, `byId.${action.payload.id}`);
    default:
      return state;
  }
}

export default messagesReducer;