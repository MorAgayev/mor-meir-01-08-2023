import { createAsyncThunk } from "@reduxjs/toolkit";
import { weatherService } from '../services/weather.service';

export const getCityAsync = createAsyncThunk('weather/getCityAsync',
    async ({selectedCity, name}) => {
        try {
            const city = await weatherService.query(selectedCity, name)
            return { city }        
        } catch (error) {
            console.log('error',error);
            throw error?.message || 'There are no cities to display'
        }
})

export const getFavoritesAsync = createAsyncThunk('weather/getFavoritesAsync',
    async () => {
        try {
            const favorites = await weatherService.getFavorites()
            return { favorites }        
        } catch (error) {
            console.log('error',error);
            throw error?.message || 'There are no favorites cities to display'
        }
})

export const toggleFavoriteAsync = createAsyncThunk('weather/toggleFavoriteAsync',
    async (payload) => {
        try {
            const favorites = await weatherService.toggleFavorite(payload)
            return { favorites }        
        } catch (error) {
            console.log('error',error);
            throw error?.message || 'Failed Toggle Favorite'
        }
})
