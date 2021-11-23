import { login } from "../services/user";

/* export const loginStart = () => ({
  type: "LOGIN_START",
});
 */
export const loginStart = (dispatch) => {
  dispatch({
    type: "LOGIN_START",
  });
};

export const loginSuccess = (data, dispatch) => {
  login(data)
    .then((user) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    })
    .catch((err) => {
      dispatch({
        type: "LOGIN_FAILURE",
      });
    });
};

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logout = (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};
