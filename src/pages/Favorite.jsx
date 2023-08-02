import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFavoritesAsync, toggleFavoriteAsync } from "../redux/weatherActions"
import { CiCircleRemove } from 'react-icons/ci'
import { IconContext } from "react-icons"
import { MainModal } from "../components/common/MainModal"

export function Favorite() {

    const [error, setError] = useState(null)

    const { favorites, weatherType } = useSelector((state)=> state.weather)
    const dispatch = useDispatch()

    const loadData = async () => {
        try {
            dispatch(getFavoritesAsync())
        } catch (error) {
            setError(error.message)
        }
    }
    
    useEffect(()=> {
            loadData()
    }, [])

    const handleCloseErrorModal = () => {
        setError(null)
        loadData()
    }

    const handleRemoveFavorite = (favorite) => {
        dispatch(toggleFavoriteAsync(favorite))
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
        <div className="favorite_section section">
            <div className="favorites-container container">
                <h1>Favorites</h1>
                <div className="favorite_cards">
                    {favorites?.length && favorites.map(favorite => {
                        return <div key={favorite.Key} className="favorite_card">
                            <div className="remove-container" onClick={()=>handleRemoveFavorite(favorite)}>
                                <IconContext.Provider value={{size: '20px'}}>
                                    <CiCircleRemove />
                                </IconContext.Provider>
                            </div>
                            <h2>{favorite.LocalizedName}</h2>
                            <h1>{favorite[weatherType].Value} <span>{weatherType.charAt(0).toUpperCase()}</span></h1>
                            <span>{favorite.description}</span>
                        </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}