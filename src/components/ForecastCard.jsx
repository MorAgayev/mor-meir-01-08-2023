import PropTypes from 'prop-types'
export function ForecastCard({title = 'Sun', temp= '30'}) {
    return (
        <div className="forecast-card-container">
            <span className="title">{title}</span>
            <span className="temp">{temp}</span>
        </div>
    )
}

ForecastCard.propTypes = {
    title: PropTypes.string,
    temp: PropTypes.string
}