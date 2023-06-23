import { URL } from "./index";
import {
  USERS_API,
  POST_REGISTER_API,
  POST_LOGIN_API,
  POST_LOGOUT_API
} from "../config/constant/apiConstant.js";
import { usersError, setUsers } from "../store/slices/UserSlice";
import {
  loginUser,
  setLoader,
  logoutUser,
  loginError
} from "../store/slices/LoginSlice";

export const loginApi = (credentials, navigate) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const response = await URL.post(`${POST_LOGIN_API}`, credentials);
      dispatch(loginUser(response.data));

      URL.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 800);

      navigate("/users");
    } catch (error) {
      dispatch(loginError(error.response.data.error));

      dispatch(setLoader(false));

      setTimeout(() => {
        dispatch(loginError(null));
      }, 3000);
    }
  };
};

export const logoutApi = (navigate) => {
  return async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const response = await URL.post(`${POST_LOGOUT_API}`);
      dispatch(logoutUser());
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 800);
      navigate("/");
    } catch (error) {
      dispatch(loginError(error.response.data.error));
      dispatch(setLoader(false));
      setTimeout(() => {
        dispatch(loginError(null));
      }, 3000);
    }
  };
};

export const addUserApi = (userdata, handleClose, limit, page) => {
  return async (dispatch) => {
    try {
      const response = await URL.post(`${POST_REGISTER_API}`, userdata);

      dispatch(fetchAllUsersApi(limit, page));
      handleClose();
    } catch (error) {
      dispatch(usersError(error.response.data.error));
      setTimeout(() => {
        dispatch(usersError(null));
      }, 3000);
    }
  };
};

export const updateUserApi = (id, userdata, handleClose, limit, page) => {
  return async (dispatch) => {
    try {
      const response = await URL.patch(`${USERS_API}/${id}`, userdata);

      dispatch(fetchAllUsersApi(limit, page));
      handleClose();
    } catch (error) {
      dispatch(usersError(error.response.data.error));
      setTimeout(() => {
        dispatch(usersError(null));
      }, 3000);
    }
  };
};

export const fetchAllUsersApi = (limit, page) => {
  return async (dispatch) => {
    try {
      let url = `${USERS_API}?page=${page}`;

      if (limit !== -1) {
        url += `&limit=${limit}`;
      }
      const response = await URL.get(url);

      dispatch(setUsers(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (id, limit, page) => {
  return async (dispatch) => {
    try {
      const response = await URL.delete(`${USERS_API}/${id}`);
      dispatch(fetchAllUsersApi(limit, page));
    } catch (err) {
      console.log(err);
    }
  };
};
