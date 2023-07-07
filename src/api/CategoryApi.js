import { URL } from "./index";
import { CATEGORIES_API,CATEGORY_API } from "../config/constant/apiConstant.js";
import { categoryError, setCategories } from "../store/slices/ProductSlice";

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