import styles from './CityItem.module.css'
import PropTypes from "prop-types"
import { useState } from "react";
import { getFlagImageUrl } from "../utils/flags";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { cityName, emoji, date } = city;
    const [showEmojiFallback, setShowEmojiFallback] = useState(false);
    const flagSrc = getFlagImageUrl(emoji);

    return (
        <li className={styles.cityItem}>
            {!showEmojiFallback && flagSrc ? (
                <img
                    className={styles.flag}
                    src={flagSrc}
                    alt={`${cityName} flag`}
                    loading="lazy"
                    onError={() => setShowEmojiFallback(true)}
                />
            ) : (
                <span className={styles.emoji}>{emoji}</span>
            )}
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>({formatDate(date)})</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    )
}

CityItem.propTypes = {
    city: PropTypes.object
}

export default CityItem
