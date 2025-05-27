import { createSlice } from "@reduxjs/toolkit";

export const ProgressSlice = createSlice({
    name: 'progress',
    initialState: "",
    reducers: {
        showCart: (state) => {
                return state ="cart"; 
        },
        hideCart: (state) => {
            return state = "";
        },
        showCheckout: (state) => {
            return state = "checkout";
        },
        hideCheckout: (state) => {
            return state = "";
        },  
    }})

export const { showCart,hideCart,showCheckout,hideCheckout} = ProgressSlice.actions;
export default ProgressSlice.reducer;