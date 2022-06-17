import {configureStore} from "@reduxjs/toolkit";
import filtersReducer from "./reducers/filtersReducer.ts";
import pizzasReducer from "./reducers/pizzasReducer.ts";
import cartReducer from "./reducers/cartReducer.ts";

export const store = configureStore({
    reducer : {
        pizzas : pizzasReducer,
        filters : filtersReducer,
        cart : cartReducer
    }
})

export type rootState = ReturnType<typeof store.getState>;
export type dispatchState = typeof store.dispatch;