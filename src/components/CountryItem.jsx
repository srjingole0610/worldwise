import styles from "./CountryItem.module.css";
import { useState } from "react";
import { getFlagImageUrl } from "../utils/flags";

function CountryItem({ country }) {
  const [showEmojiFallback, setShowEmojiFallback] = useState(false);
  const flagSrc = getFlagImageUrl(country.emoji);

  return (
    <li className={styles.countryItem}>
      {!showEmojiFallback && flagSrc ? (
        <img
          className={styles.flag}
          src={flagSrc}
          alt={`${country.country} flag`}
          loading="lazy"
          onError={() => setShowEmojiFallback(true)}
        />
      ) : (
        <span className={styles.emoji}>{country.emoji}</span>
      )}
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
