import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [
        {
            product:{},
            quantity: 0,
        }
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
            return state.filter((item) => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            state = [];
        }
    }})

export const { addToCart,deleteFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;