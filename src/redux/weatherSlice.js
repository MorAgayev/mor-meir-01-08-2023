import { createSlice } from "@reduxjs/toolkit";
import { getCityAsync, getFavoritesAsync, toggleFavoriteAsync, setWeatherType } from "./weatherActions";

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        city: null,
        favorites: null,
        weatherType: 'fahrenheit',
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
        },
        [setWeatherType.fulfilled]: (state, action) => {
            state.weatherType = action.payload.weatherType
        }
    }
})

export default weatherSlice.reducer