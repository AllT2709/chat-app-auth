export default (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        token: null,
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        token: null,
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        user: null,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
};
