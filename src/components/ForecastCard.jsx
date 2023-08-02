import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

export function ForecastCard({title = 'Sun', temp= '30'}) {
    const {weatherType} = useSelector((state)=> state.weather)
    return (
        <div className="forecast-card-container">
            <span className="title">{title}</span>
            <span className="temp">{temp} <small>{weatherType?.charAt(0).toUpperCase()}</small></span>
        </div>
    )
}

ForecastCard.propTypes = {
    title: PropTypes.string,
    temp: PropTypes.string
}