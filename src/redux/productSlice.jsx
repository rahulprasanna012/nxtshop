import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],        // Original products from API
        filteredProduct: [], // Filtered and sorted products
        loading: true,
        search: "",
        error: null,
        wishlist: [],
        sortBy: "recommended",
    },
    reducers: {
        setProducts: (state, action) => {
            state.product = action.payload;
            state.filteredProduct = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            const searchLower = action.payload.toLowerCase();
            
            
            state.filteredProduct = state.product.filter(item => 
                item.title.toLowerCase().includes(searchLower)
            );
            
            
            if (state.sortBy !== "recommended") {
                const sortAction = { payload: state.sortBy };
                productSlice.caseReducers.sortProducts(state, sortAction);
            }
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        toggleWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlist = state.wishlist.includes(productId)
                ? state.wishlist.filter(id => id !== productId)
                : [...state.wishlist, productId];
        },
        sortProducts: (state, action) => {
            state.sortBy = action.payload;
            const productsToSort = [...state.filteredProduct]; 
            
            switch (action.payload) {
                case "newest":
                    productsToSort.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case "popular":
                    productsToSort.sort((a, b) => b.rating.rate - a.rating.rate);
                    break;
                case "priceHighToLow":
                    productsToSort.sort((a, b) => b.price - a.price);
                    break;
                case "priceLowToHigh":
                    productsToSort.sort((a, b) => a.price - b.price);
                    break;
                default:
                    
                    break;
            }
            
            state.filteredProduct = productsToSort;
        },
    },
});

export const { 
    setProducts, 
    setLoading, 
    setError, 
    toggleWishlist, 
    sortProducts, 
    setSearch
} = productSlice.actions;

export default productSlice.reducer;