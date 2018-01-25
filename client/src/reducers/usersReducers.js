const defaultState = {
  _id: -1,
  username: '',
  oathId: '',
};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'REMOVE_CURRENT_USER':
      return {
        _id: -1,
        username: '',
        oathId: '',
      };
    default:
      return state;
  }
};

export default usersReducer;
