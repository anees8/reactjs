import { URL } from "./index";
import { CATEGORIES_API,CATEGORY_API,CATEGORY_STATUS_API } from "../config/constant/apiConstant.js";
import { categoryError, setCategories } from "../store/slices/CategorySlice";

export const fetchAllCategoriesApi = (limit, page, sortDirection, search) => {
  return async (dispatch) => {
    try {
      let url = `${CATEGORIES_API}?page=${page}`;

      if (limit !== -1) {
        url += `&limit=${limit}`;
      }
      if (sortDirection != null) {
        url += `&sort=${sortDirection}`;
      }
      if (search) {
        url += `&search=${search}`;
      }
      const response = await URL.get(url);

      dispatch(setCategories(response.data));
    } catch (err) {
      dispatch(categoryError(err.response));
      setTimeout(() => {
        dispatch(categoryError(null));
      }, 3000);
    }
  };
};

export const deleteCategoryApi = (id, limit, page) => {
  return async (dispatch) => {
    try {
      const response = await URL.delete(`${CATEGORY_API}/${id}`);
      dispatch(fetchAllCategoriesApi(limit, page));
    } catch (err) {

      dispatch(categoryError(err.response));
      setTimeout(() => {
        dispatch(categoryError(null));
      }, 3000);
    }
  };
};

export const addCategoryApi = (categorydata, handleClose, limit, page) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      // Append other category data to the form data
      formData.append("name", categorydata.name);
      formData.append("description", categorydata.description);     
      formData.append("status", categorydata.status);
      formData.append(`images`, categorydata.images);
      

      const response = await URL.post(`${CATEGORY_API}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      dispatch(fetchAllCategoriesApi(limit, page));
      handleClose();
    } catch (error) {
      if(error.response){
      dispatch(categoryError(error.response.data.error));
      setTimeout(() => {
        dispatch(categoryError(null));
      }, 3000);
    }
    }
  };
};

export const updateCategoryApi = (id, categorydata,handleClose,limit,page) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      // Append other category data to the form data
      formData.append("name", categorydata.name);
      formData.append("description", categorydata.description);
      formData.append("status", categorydata.status);
      formData.append(`images`, categorydata.images);

      const response = await URL.patch(`${CATEGORY_API}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        } 
      });

   dispatch(fetchAllCategoriesApi(limit, page));
      handleClose();
    } catch (error) {
      if(error.response){
      dispatch(categoryError(error.response.data.error));
      setTimeout(() => {
        dispatch(categoryError(null));
      }, 3000);
    }
    }
  };
};

export const updateCategoryStatusApi = (id, categorydata,limit,page) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append("status", categorydata.status);
     
      const response = await URL.patch(`${CATEGORY_STATUS_API}/${id}`, formData);
      dispatch(fetchAllCategoriesApi(limit, page));
    } catch (error) {
      if(error.response){
      dispatch(categoryError(error.response.data.error));
      setTimeout(() => {
        dispatch(categoryError(null));
      }, 3000);
    }
    }
  };
}
