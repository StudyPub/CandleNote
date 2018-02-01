const defaultState = {
  username: '',
  userId: -1,
  oathId: '',
};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      console.log('ACTION:', action);
      return {
        ...state,
        ...action.payload,
      };
    case 'REMOVE_CURRENT_USER':
      return {
        username: '',
        userId: -1,
        oathId: '',
      };
    case 'SET_USERS': {
      console.log('PAYLOAD: ', action.payload);
      const usersById = action.payload.reduce((users, user) => ({
        ...users,
        [user._id]: user,
      }), {});
      return { byId: usersById };
    }
    default:
      return state;
  }
};

export default usersReducer;
