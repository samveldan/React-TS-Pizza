import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas", async() => {
    const pizzas = await axios.get('https://628ff784dc4785236549c5a3.mockapi.io/pizzas');
    return (pizzas.data) as {[key: string]: string | number}[];
})

export const fetchBought = createAsyncThunk("pizzas/fetchBought", async() => {
    const bought = await axios.get("https://628ff784dc4785236549c5a3.mockapi.io/bought");
    return (bought.data) as {[key: string]: string | number}[];
})

type FilteredDataProps = {
    [key: string]: string | number | {type: number; size: number; price: number}[];
}

type PizzaProps = {
    data: {[key: string]: string | number}[];
    filteredData: FilteredDataProps[];
    bought: {[key: string]: string | number}[];
    search: string;
    isLoading: boolean;
    currentPizza: {
        [key: string]: string | number | {[key: string]: string | number}[]
    }
}

const initialState: PizzaProps = {
    data : [],
    filteredData : [],
    bought : [],
    search : "",
    isLoading : true,
    currentPizza : {}
}

const pizzasSlice = createSlice({
    name : "pizzas",
    initialState,
    reducers: {
        setSearch(state: PizzaProps, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setFilteredData(state: PizzaProps, action: PayloadAction<FilteredDataProps[]>) {
            state.filteredData = action.payload;
        },
        setCurrentPizza(state: PizzaProps, action: PayloadAction<{[key: string]: string | number | {[key: string]: string | number}[]}>) {
            state.currentPizza = action.payload;
        },
        sortItems(state: PizzaProps, action: PayloadAction<{category: number; sort: number}>) {
            const {category, sort} = action.payload
            
            state.filteredData = state.data.filter(item => {
                if(item.category == category && category != 0) return item;
                else if (category == 0) return item;
            })

            state.filteredData = state.filteredData.sort((a, b): number => {
                if(sort == 0) {
                    if(Number(b.rating) - Number(a.rating) > 0) return 1;
                    else if(Number(b.rating) - Number(a.rating) < 0) return -1;
                    else return 0;
                }
                else if(sort == 1) {
                    type Info = {
                        type: number;
                        size: number;
                        price: number;
                    }[]
                    const aInfo = a.info as Info;
                    const bInfo = b.info as Info;

                    const priceA = Math.min(...aInfo.map((i) => i.price));
                    const priceB = Math.min(...bInfo.map((i) => i.price));

                    if(priceB - priceA > 0) return -1;
                    else if(priceB - priceA < 0) return 1;
                    else return 0;
                }
                else if(sort == 2) {
                    if(b.title[0].toLowerCase() > a.title[0].toLowerCase()) return -1;
                    else if(b.title[0].toLowerCase() < a.title[0].toLowerCase()) return 1;
                    else return 0;
                }
                else return 999
            })
        },
        searchItems(state: PizzaProps, _) {
            state.filteredData = state.filteredData.filter(item => {
                const title = String(item.title).toLowerCase().split(" ");
                let flag = false;
                
                title.forEach(word => {
                    if(word.startsWith(state.search.toLowerCase())) flag = true;
                })

                if(flag) return item;
            })
        }
    },
    extraReducers : builder => {
        builder.addCase(fetchPizzas.fulfilled, (state: PizzaProps, action: PayloadAction<{[key: string]: string | number}[]>) => {
            state.isLoading = false;
            state.data = action.payload;
            state.filteredData = action.payload;
        });

        builder.addCase(fetchBought.fulfilled, (state: PizzaProps, action: PayloadAction<{[key: string]: string | number}[]>) => {
            state.bought = action.payload;
        });
    }
})

export const {setSearch, setFilteredData, sortItems, searchItems, setCurrentPizza} = pizzasSlice.actions;
export default pizzasSlice.reducer;