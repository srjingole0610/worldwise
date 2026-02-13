import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import styles from './Map.module.css'
function Map() {
    const navigate = useNavigate()
    const [mapPostion, setMapPostion] = useState([18.5246, 73.8786])
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
                <Marker position={mapPostion}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
