import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import styles from './Map.module.css'
import { useCities } from '../contexts/CitiesContext'
import { getFlagImageUrl } from '../utils/flags'

function PopupFlag({ emoji, cityName }) {
    const [showEmojiFallback, setShowEmojiFallback] = useState(false)
    const flagSrc = getFlagImageUrl(emoji)

    if (!showEmojiFallback && flagSrc) {
        return (
            <img
                className={styles.popupFlag}
                src={flagSrc}
                alt={`${cityName} flag`}
                loading="lazy"
                onError={() => setShowEmojiFallback(true)}
            />
        )
    }

    return <span className={styles.popupEmoji}>{emoji}</span>
}

function Map() {
    const navigate = useNavigate()
    const { cities } = useCities();
    const [mapPostion, setMapPostion] = useState([40.46635901755316, -3.7133789062500004])
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    return (
        <div className={styles.mapContainer} onClick={() => {
            navigate("form")
        }}>
            <MapContainer center={mapPostion} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <PopupFlag emoji={city.emoji} cityName={city.cityName} />
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map
