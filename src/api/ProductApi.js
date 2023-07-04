import { URL } from "./index";
import { PRODUCTS_API } from "../config/constant/apiConstant.js";
import { productError, setProducts } from "../store/slices/ProductSlice";

export const fetchAllProductsApi = (limit, page, sortDirection, search) => {
  return async (dispatch) => {
    try {
      let url = `${PRODUCTS_API}?page=${page}`;

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

      dispatch(setProducts(response.data));
    } catch (err) {
      dispatch(productError(err.response));
      setTimeout(() => {
        dispatch(productError(null));
      }, 3000);
    }
  };
};

export const deleteProduct = (id, limit, page) => {
  return async (dispatch) => {
    try {
      const response = await URL.delete(`${PRODUCTS_API}/${id}`);
      dispatch(fetchAllProductsApi(limit, page));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProductApi = (productdata, handleClose, limit, page) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      // Append other product data to the form data
      formData.append("name", productdata.name);
      formData.append("description", productdata.description);
      formData.append("price", productdata.price);

      // Append images to the form data
      productdata.images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await URL.post(`${PRODUCTS_API}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      dispatch(fetchAllProductsApi(limit, page));
      handleClose();
    } catch (error) {
      dispatch(productError(error.response.data.error));
      setTimeout(() => {
        dispatch(productError(null));
      }, 3000);
    }
  };
};

export const updateProductApi = (id, productdata, handleClose, limit, page) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      // Append other product data to the form data
      formData.append("name", productdata.name);
      formData.append("description", productdata.description);
      formData.append("price", productdata.price);

      // Append images to the form data
      productdata.images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await URL.patch(`${PRODUCTS_API}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      dispatch(fetchAllProductsApi(limit, page));
      handleClose();
    } catch (error) {
      dispatch(productError(error.response.data.error));
      setTimeout(() => {
        dispatch(productError(null));
      }, 3000);
    }
  };
};
