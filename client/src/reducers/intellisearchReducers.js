
const defaultState = {
  meaning: '',
  limit: 10,
};

const intellisearchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MEANING':
      return {
        ...state,
        meaning: action.payload.meaningString,
      };
    case 'SET_MAX_RESULTS':
      return {
        ...state,
        limit: action.payload.limit,
      };
    default:
      return state;
  }
};

export default intellisearchReducer;
