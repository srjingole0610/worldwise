import styles from './CityItem.module.css'
import PropTypes from "prop-types"
import { useState } from "react";
import { getFlagImageUrl } from "../utils/flags";
import { Link } from 'react-router-dom';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { cityName, emoji, date, id } = city;
    const [showEmojiFallback, setShowEmojiFallback] = useState(false);
    const flagSrc = getFlagImageUrl(emoji);

    return (
        <li >
            <Link className={styles.cityItem} to={`${id}`}>
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
            </Link>
        </li>
    )
}

CityItem.propTypes = {
    city: PropTypes.object
}

export default CityItem
