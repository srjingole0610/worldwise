import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { getFlagImageUrl } from "../utils/flags";
import useGeolocation from "../hooks/useGeolocation";
import Button from "../components/Button";
import useUrlPosition from "../hooks/useUrlPosition";

function PopupFlag({ emoji, cityName }) {
  const [showEmojiFallback, setShowEmojiFallback] = useState(false);
  const flagSrc = getFlagImageUrl(emoji);

  if (!showEmojiFallback && flagSrc) {
    return (
      <img
        className={styles.popupFlag}
        src={flagSrc}
        alt={`${cityName} flag`}
        loading='lazy'
        onError={() => setShowEmojiFallback(true)}
      />
    );
  }

  return <span className={styles.popupEmoji}>{emoji}</span>;
}

function Map() {
  const { cities } = useCities();

  const [mapPostion, setMapPosition] = useState([
    40.46635901755316, -3.7133789062500004,
  ]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPostion}
        // center={[mapLat, mapLng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
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
        <ChangeCenter position={mapPostion} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lng=${e.latlng.lng}&lat=${e.latlng.lat}`);
    },
  });
}

export default Map;
