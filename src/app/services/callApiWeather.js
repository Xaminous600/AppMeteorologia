export function getWeatherDaily(search){
    return fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${search}&timesteps=1d&apikey=${process.env.API_KEY}`)
    .then(response => response.json())
}

export function getWeatherHourly(search){
    return fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${search}&timesteps=1h&apikey=${process.env.API_KEY}`)
    .then(response => response.json())
}