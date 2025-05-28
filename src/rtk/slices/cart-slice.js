import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [
    ],
    reducers: {
        addToCart: (state, action) => {
                const existingItem = state.find(item => item.product.id === action.payload.id);
                if(existingItem) {
                    existingItem.quantity += 1;
                    return;
                }
                state.push({ product: action.payload, quantity: 1 });
        },
        deleteFromCart: (state, action) => {
            const existingItem = state.find(item => item.product.id === action.payload.id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                return;
            }
            return state.filter((item) => item.product.id !== action.payload.id);
        }
    }})

export const { addToCart,deleteFromCart} = cartSlice.actions;
export default cartSlice.reducer;