import { createSlice } from "@reduxjs/toolkit";
import { getCityAsync, getFavoritesAsync, toggleFavoriteAsync } from "./weatherActions";
// import { getCityAsync, getFavoritesAsync, addCityAsync, deleteCityAsync } from "./weatherActions";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        city: null,
        favorites: null,
        error: null
    },
    extraReducers: {
        [getCityAsync.fulfilled]: (state, action) => {
            state.city = action.payload.city
        },
        [toggleFavoriteAsync.fulfilled]: (state, action) => {
            state.favorites = action.payload.favorites
        },
        [getFavoritesAsync.fulfilled]: (state, action) => {
            state.favorites = action.payload.favorites
        }
    }
})

export default weatherSlice.reducer