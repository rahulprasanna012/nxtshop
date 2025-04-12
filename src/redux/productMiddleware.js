import axios from "axios";
import productSlice from "./productSlice";

const action = productSlice.actions;

export const fetchProductMiddleware = async (dispatch)=>{


    try {
        const response = await axios.get('https://fakestoreapi.com/products');

        const data=await response.data
        
        dispatch(action.useProduct( data))

    } catch (error) {
        console.error("Error fetching products:", error);
    } 


}
