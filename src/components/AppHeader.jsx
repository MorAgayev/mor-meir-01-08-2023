import { NavLink, useLocation } from "react-router-dom";
import { IconContext } from 'react-icons'
import { BsFillMoonFill, BsMoon } from 'react-icons/bs'
import { HiMenu } from 'react-icons/hi'
import { MdOutlineCancel } from 'react-icons/md'
import { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useSelector, useDispatch } from "react-redux";
import { setWeatherType, toggleFavoriteAsync } from "../redux/weatherActions";
import SelectField from "./common/SelectField";
import { WEATHER_TYPES } from "../assets/consts";

export function AppHeader() {
    const [isLightTheme, setIsLightTheme] = useState(false)
    const [isMobileMode, setIsMobileMode] = useState(false)
    const [isShowNav, setIsShowNav] = useState(true)
    const location = useLocation();
    const dispatch = useDispatch()
    const { city, favorites, weatherType } = useSelector((state)=> state.weather)

    
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setIsShowNav(!isMobileMode)
    }, [location, isMobileMode])


    function handleResize() {
        setIsMobileMode(window.innerWidth <= 575)
    }

    const handleThemeChange = () => {
        setIsLightTheme(!isLightTheme)
        document.querySelector('body').classList.toggle('light__theme')
    }

    const handleToggleFavorite = () => {
        dispatch(toggleFavoriteAsync(city))
    }

    const handleChangeWeatherType = (value) => {
        dispatch(setWeatherType(value))
    }

    const isFavorite = () => {
        if (!favorites?.length) return false
        return favorites.some(favorite => favorite.Key === city?.Key) 
    }

    return (
        <div className="header_container container">
            {isMobileMode && 
                <IconContext.Provider value={{ size: '20px' }}>
                     <div className="nav_icon" onClick={() => setIsShowNav(!isShowNav)}>
                        {isShowNav ? <MdOutlineCancel/> : <HiMenu/>}
                    </div>
                </IconContext.Provider>
            }
            <nav className="nav-container">
                    {isShowNav &&
                        <ul className={isMobileMode ? 'mobile' : ''}>
                            <li>
                                <NavLink to="/" activeclassname="active">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/favorite" activeclassname="active">Favorite</NavLink>
                            </li>
                        </ul>
                    }
            </nav>
                <div className="logo">
                <span>WeatherApp</span>
            </div>
            <div className="right">
                <div className="favorite-icon-container" onClick={handleToggleFavorite}>
                    <IconContext.Provider value={{ size: '20px' }}>
                        {isFavorite() ? <AiFillStar/> : <AiOutlineStar/> }
                    </IconContext.Provider>
                </div>
                <div className="color-mode-container" onClick={handleThemeChange}>
                    {isLightTheme ? <BsMoon/> : <BsFillMoonFill/>}
                </div>
                <div className="select_temp_type">
                    <SelectField defaultValue={weatherType} options={WEATHER_TYPES} select={handleChangeWeatherType}/>
                </div>
            </div>
        </div>
    )
}