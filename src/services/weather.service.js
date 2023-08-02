import axios from 'axios';

export const weatherService = {
  query,
  getCities,
  toggleFavorite,
  getFavorites,
  setWeatherType,
  getWeatherType
}

const STORAGE_KEY = 'cities'
const STORAGE_KEY_FAVORITES = 'favorite'
const STORAGE_KEY_WEATHER_TYPE = 'weatherType'
const API_KEY = 'nhBv0i9fPyKsWWxSXTS0xFx1mNQZZ3jQ';
const gCities = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

async function query(selectedCity, location = 'tel aviv') {
    try {
        let city = {}
    
        if(gCities.length) {
            const name = selectedCity?.LocalizedName || location
            city = gCities.find(city=> city.LocalizedName.toLowerCase() === name.toLowerCase())
            if(city) return city;
        }
        if (!selectedCity) {
            const data = await getCities(location)
            city = {Key: data[0].Key, LocalizedName: data[0].LocalizedName}
        }
        else {
            city = {...selectedCity}
        }
    
        const currentWeather = await loadCurrentWeather(city.Key)
    
        const dailyForecasts = await loadDailyForecasts(city.Key)

        city = {...city, ...currentWeather, ...dailyForecasts}
    
        gCities.push(city)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gCities))
    
        return city; 
    } catch (error) {
        throw error || 'Failed Loading Weather'
    }

}

async function loadCurrentWeather(code) {
    try {
        const { data } = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${code}?apikey=${API_KEY}&details=true`)
        return { celsius:data[0].ApparentTemperature.Metric, fahrenheit:data[0].ApparentTemperature.Imperial, description: data[0].WeatherText }
    } catch (error) {
        throw error || 'Failed Loading Current Weather'
    }
}

async function loadDailyForecasts(code) {
    try {
        const data = await axios.all([
            axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${code}?apikey=${API_KEY}&details=true&metric=true`),
            axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${code}?apikey=${API_KEY}&details=true&metric=false`)
        ])

        const celsiusData = data[0].data.DailyForecasts
        const fahrenheitData = data[1].data.DailyForecasts

        const forecast = celsiusData.map((celsiusData, idx) => {
            return { Date: celsiusData.Date, celsius: celsiusData.Temperature, fahrenheit: fahrenheitData[idx].Temperature}
        })

        return { dailyForecasts: forecast}
    } catch (error) {
        throw error || 'Failed Loading Daily Forecasts'
    }
}

async function getCities(value = 't') {
    try {
        const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`)
        return data
    } 
    catch (error) {
        throw error || 'Failed Loading Cities'
    }
}

async function toggleFavorite(selectedCity) {
    const favorites = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITES)) || []
    if (favorites.length) {
        const idx = favorites.findIndex(city=> city.Key === selectedCity.Key)

        if (idx >= 0) {
            favorites.splice(idx, 1)
        }
        else {
            favorites.push(selectedCity)
        }

    } else {
        favorites.push(selectedCity)
    }

    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites))
    return favorites
}

async function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITES))
}

async function setWeatherType(type) {
    localStorage.setItem(STORAGE_KEY_WEATHER_TYPE, JSON.stringify(type))
    return type
}

async function getWeatherType() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_WEATHER_TYPE))
}