import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'

import PropTypes from 'prop-types'
function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message="Add Your first city by clicking on a city on the map" />

    const countries = cities.reduce((acc, city) => {
        if (!acc.map(el => el.country).includes(city.country)) {
            acc.push({ country: city.country, emoji: city.emoji, id: city.id })
        }
        return acc
    }, [])

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => {
                return <CountryItem country={country} key={country.country} />
            })}
        </ul>
    )
}


export default CountryList;

