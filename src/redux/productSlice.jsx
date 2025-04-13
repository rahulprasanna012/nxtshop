import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        filteredProduct: [],
        loading: true,
        search: "",
        productDetail: null,
        error: null,
        wishlist: [],
        cart: [],
        sortBy: "recommended",
        activeFilters: {
            categories: [],
            priceRange: [0, 1000],
            ratings: []
        }
    },
    reducers: {
        setProductDetails: (state, action) => {
            state.productDetail = action.payload;
            state.loading = false;
            state.error = null;
        },
        setProducts: (state, action) => {
            state.product = action.payload;
            state.filteredProduct = action.payload;
            state.loading = false;
            state.error = null;
            
            if (action.payload.length > 0) {
                const prices = action.payload.map(p => p.price);
                state.activeFilters.priceRange = [
                    Math.floor(Math.min(...prices)),
                    Math.ceil(Math.max(...prices))
                ];
            }
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            productSlice.caseReducers.applyFilters(state);
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
        addToCart: (state, action) => {
            const { id, quantity = 1 } = action.payload;
            const existingItem = state.cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                const product = state.product.find(p => p.id === id);
                if (product) {
                    state.cart.push({
                        ...product,
                        quantity
                    });
                }
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter(item => item.id !== productId);
        },
        updateCartItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cart.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        sortProducts: (state, action) => {
            state.sortBy = action.payload;
            productSlice.caseReducers.applyFilters(state);
        },
        updateFilters: (state, action) => {
            state.activeFilters = {
                ...state.activeFilters,
                ...action.payload
            };
            productSlice.caseReducers.applyFilters(state);
        },
        resetFilters: (state) => {
            state.activeFilters = {
                categories: [],
                priceRange: [
                    Math.floor(Math.min(...state.product.map(p => p.price))),
                    Math.ceil(Math.max(...state.product.map(p => p.price)))
                ],
                ratings: []
            };
            state.filteredProduct = [...state.product];
            state.sortBy = "recommended";
            state.search = "";
        },
        applyFilters: (state) => {
            let filtered = [...state.product];
            
            if (state.search) {
                const searchLower = state.search.toLowerCase();
                filtered = filtered.filter(item => 
                    item.title.toLowerCase().includes(searchLower)
                );
            }
            
            if (state.activeFilters.categories.length > 0) {
                filtered = filtered.filter(item => 
                    state.activeFilters.categories.includes(item.category)
                );
            }
            
            filtered = filtered.filter(item => 
                item.price >= state.activeFilters.priceRange[0] && 
                item.price <= state.activeFilters.priceRange[1]
            );
            
            if (state.activeFilters.ratings.length > 0) {
                filtered = filtered.filter(item => 
                    state.activeFilters.ratings.some(r => 
                        Math.floor(item.rating.rate) === r
                    )
                );
            }
            
            switch (state.sortBy) {
                case "newest":
                    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case "popular":
                    filtered.sort((a, b) => b.rating.rate - a.rating.rate);
                    break;
                case "priceHighToLow":
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case "priceLowToHigh":
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                default:
                    break;
            }
            
            state.filteredProduct = filtered;
        }
    }
});

export const { 
    setProducts, 
    setLoading, 
    setError, 
    toggleWishlist, 
    sortProducts, 
    setProductDetails,
    setSearch,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    updateFilters,
    resetFilters
} = productSlice.actions;

export default productSlice.reducer;