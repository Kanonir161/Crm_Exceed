import {
  LOAD_USER, LOAD_USER_SUCCESS, LOAD_CURRENT_USER, CURRENT_USER, FIND_USER, DELETE_USER,
  FILTER_USER_STATUS, LOAD_CURRENT_USER_SUCCESS, FILTER_USER_NAME,
} from '../../ActionTypes/usersTypes/usersTypes';

const initialState = {
  users: [],
  filteredUsers: [],
  loadingUsers: false,
  loadingCurrentUser: false,
  currentUser: null,
  filters: {
    status: ['junior', 'middle', 'senior'],
    name: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
        filteredUsers: state.users.filter(user => user._id !== action.payload),
      }
    case LOAD_USER:
      return {
        ...state,
        loadingUsers: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload,
        loadingUsers: false,
      };
    case LOAD_CURRENT_USER:
      return {
        ...state,
        loadingCurrentUser: true,
      };
    case LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loadingCurrentUser: false,
      };
    case CURRENT_USER:
      return {
        ...state,
        users: action.payload,
        loadingCurrentUser: false,
      };
    case FIND_USER:
      return {
        ...state,
        currentUser: state.users.find((user) => user._id === action.payload),
      };
    case FILTER_USER_STATUS:
      return {
        ...state,
        filters: {
          status: action.payload,
          name: state.filters.name,
        },
        filteredUsers: state.users.filter((user) => {
          if (action.payload.length === 0) return state.filteredUsers;
          const filtered =
            user.status && action.payload.includes(user.status)
            && user.login && user.login.indexOf(state.filters.name) > -1;
          return filtered;
        }),
      };
    case FILTER_USER_NAME:
      return {
        ...state,
        filters: {
          status: state.filters.status,
          name: action.payload,
        },
        filteredUsers: state.users.filter((user) => {
          const filtered =
            user.status && state.filters.status.includes(user.status)
            && user.login && user.login.indexOf(action.payload) > -1;
          return filtered;
        }),
      };
    default:
      return state;
  }
};

export default userReducer;



