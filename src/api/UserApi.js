import { URL } from "./index";
import { USERS_API } from "../config/constant/apiConstant.js";
import { usersError, setUsers } from "../store/slices/UserSlice";
import { loginUser, logoutUser, loginError } from "../store/slices/LoginSlice";

export const loginApi = (credentials, navigate) => {
  return async (dispatch) => {
    try {
      const response = await URL.post(`login`, credentials);
      dispatch(loginUser(response.data));
      URL.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      navigate("/users");
    } catch (error) {
      dispatch(loginError(error.response.data.error));
      setTimeout(() => {
        dispatch(loginError(null));
      }, 3000);
    }
  };
};
export const logoutApi = (navigate) => {
  return async (dispatch) => {
    try {
      const response = await URL.post(`logout`);
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      dispatch(loginError(error.response.data.error));
      setTimeout(() => {
        dispatch(loginError(null));
      }, 3000);
    }
  };
};

export const addUserApi = (userdata, handleClose) => {
  return async (dispatch) => {
    try {
      const response = await URL.post(`register`, userdata);

      dispatch(fetchAllUsersApi());
      handleClose();
    } catch (error) {
      dispatch(usersError(error.response.data.error));
      setTimeout(() => {
        dispatch(usersError(null));
      }, 3000);
    }
  };
};

export const updateUserApi = (id, userdata, handleClose) => {
  return async (dispatch) => {
    try {
      const response = await URL.patch(`${USERS_API}/${id}`, userdata);

      dispatch(fetchAllUsersApi());
      handleClose();
    } catch (error) {
      dispatch(usersError(error.response.data.error));
      setTimeout(() => {
        dispatch(usersError(null));
      }, 3000);
    }
  };
};

export const fetchAllUsersApi = () => {
  return async (dispatch) => {
    try {
      const response = await URL.get(`${USERS_API}`);
      dispatch(setUsers(response.data.users));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await URL.delete(`${USERS_API}/${id}`);
      dispatch(fetchAllUsersApi());
    } catch (err) {
      console.log(err);
    }
  };
};
