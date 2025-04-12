import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{
        product:[],
        loading:true,
        wishlist:[]
    },


    reducers:{

            useProduct:(state,action)=>{

                state.product=action.payload;
                state.loading=false;
            },

            useLoading:(state)=>{
                state.loading=true;

            },
            useWishlist:(state,action)=>{

                state.wishlist=action.payload;

            }



    }
})

export default productSlice