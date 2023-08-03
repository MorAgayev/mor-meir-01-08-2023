import { useEffect, useState } from "react"
import { ForecastCard } from "../components/ForecastCard"
import { getCityAsync } from "../redux/weatherActions"
import { useDispatch, useSelector } from 'react-redux'
import { SearchField } from "../components/common/SearchField"
import { weatherService } from "../services/weather.service"
import { debounce, getDayFromDate, getAvg} from '../services/utils'
import { MainModal } from "../components/common/MainModal"

export function Weather() {

    const [options, setOptions] = useState([])
    const [error, setError] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)

    const dispatch = useDispatch()
    const { city, weatherType } = useSelector((state)=> state.weather)

    useEffect(()=> {
        loadCity()
    },[selectedCity])

    // useEffect(()=> {
    //     loadCities('')
    // },[])

    async function loadCity() {
        try {
            dispatch(getCityAsync({selectedCity, name:'tel aviv'}))
        } catch (error) {
            setError(error.message)
        }
    }

    async function loadCities(value) {
        try {
            const cities = await weatherService.getCities(value)
            if (cities) {
                setOptions(cities)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const handleSearch = (e) => {
        if (!e.target.value) return []
        
        debounce(() => {
            loadCities(e.target.value)
        }, 1000);
    }

    const handleSelect = (value) => {
        if (value) {
            setSelectedCity(value)
        }
    }

    const handleCloseErrorModal = () => {
        setError(null)
        loadCity()
    }

    if (error) {
        return (
            <div className="error__container">
                <MainModal close={handleCloseErrorModal}>
                    <h1>{error}</h1>
                </MainModal>
            </div>
        )
    }

    return (
        <div className="weather_section section">
            <div className="weather_container container">
                <SearchField search={handleSearch} options={options} select={handleSelect} value={selectedCity?.LocalizedName || ''}/>
                {city && <div className="top_content">
                    <h2 className="location_title">{city.LocalizedName}</h2>
                    <h1 className="temp">{city[weatherType].Value} <span>{weatherType?.charAt(0).toUpperCase() || ''}</span></h1>
                    <small className="temp_desc">{city.description}</small>
                </div>}
                <div className="weekly-forecast">
                    {city && city.dailyForecasts.map((forecast)=> {
                        return <ForecastCard key={forecast.Date} title={getDayFromDate(forecast.Date)} temp={getAvg([forecast[weatherType].Maximum.Value, forecast[weatherType].Minimum.Value])}/>
                    })}
                </div>
            </div>
        </div>
    )
}