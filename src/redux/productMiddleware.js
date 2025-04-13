// src/redux/productMiddleware.js
import axios from 'axios';
import { setProducts,setProductDetails, setLoading, setError } from './productSlice';

export const fetchProductMiddleware = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get('https://fakestoreapi.com/products');
    dispatch(setProducts(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchProductDetailsMiddleware=(id)=>async (dispatch)=>{

  console.log(id)

  try {
    dispatch(setLoading());
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    dispatch(setProductDetails(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }

}