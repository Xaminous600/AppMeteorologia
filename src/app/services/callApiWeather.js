export function getWeatherDaily(search){
    return fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${search}&timesteps=1d&apikey=${process.env.REACT_APP_API_KEY_WEATHER}`)
    .then(response => response.json())
}

export function getWeatherHourly(search){
    return fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${search}&timesteps=1h&apikey=${process.env.REACT_APP_API_KEY_WEATHER}`)
    .then(response => response.json())
}

export function getAirQuality(search){
    return fetch(`https://api.waqi.info/feed/${search}/?token=${process.env.REACT_APP_API_KEY_AIQ}`)
    .then(response => response.json())
}