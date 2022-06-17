import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
    category : number,
    sort : number,
    currentPage : number,
    pages : number
}

const initialState: initialStateProps = {
    category : 0,
    sort : 0,
    currentPage : 0,
    pages : 1
}

const filtersSlice = createSlice({
    name : "filters",
    initialState,
    reducers : {
        setCategory(state: initialStateProps, action: PayloadAction<number>) {
            state.category = action.payload;
        },
        setSort(state: initialStateProps, action: PayloadAction<number>) {
            state.sort = action.payload;
        },
        setCurrentPage(state: initialStateProps, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setPages(state: initialStateProps, action: PayloadAction<number>) {
            state.pages = action.payload;
        }
    }
});

export const {setCategory, setSort, setCurrentPage, setPages} = filtersSlice.actions;
export default filtersSlice.reducer;