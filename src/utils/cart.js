import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        quantity: 0,
        totalPrice: 0
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            state.quantity += newItem.quantity;
            state.totalPrice += newItem.price * newItem.quantity;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price * newItem.quantity,
                    image: newItem.image,
                    description: newItem.description
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },

        removeItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            // console.log(existingItem);

            state.quantity -= existingItem.quantity;
            state.totalPrice -= existingItem.price;

            state.items = state.items.filter(item => item.id !== id);
        },

        checkOut: (state) => {
            state.items = [];
            state.quantity = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addItem, removeItem, checkOut } = cartSlice.actions;
export default cartSlice.reducer;