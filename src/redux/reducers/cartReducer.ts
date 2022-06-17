import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
    items: number;
    total: number;
}

const initialState: initialStateProps = {
    items : 0,
    total : 0
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        setItems(state: initialStateProps, action: PayloadAction<number>) {
            state.items = action.payload;
        },
        setTotal(state: initialStateProps, action: PayloadAction<number>) {
            state.total = action.payload;
        }
    }
})

export const {setItems, setTotal} = cartSlice.actions;
export default cartSlice.reducer;