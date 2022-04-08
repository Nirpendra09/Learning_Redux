import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        // setProducts(state, action) {
        //     state.data = action.payload
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDEAL;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = SATUSES.ERROR;
        })
    }
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunk :

export const fetchProducts = createAsyncThunk('products/fetch', async() => {
    const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json()
            return data;
})

// export function fetchProducts() {
//     return async function fetchProductsThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING))
//         try {
//             const response = await fetch('https://fakestoreapi.com/products');
//             const data = await response.json()
//             dispatch(setProducts(data))
//             dispatch(setStatus(STATUSES.IDLE))
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }