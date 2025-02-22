const weatherInputEl = document.querySelector('.search_input')
const seacrchBtnel = document.querySelector('.search_btn')
const weatherCardEl = document.querySelector('.card')
const dayData = document.querySelector('.day')
const currDayData = document.querySelector('.day-data')
const title = document.querySelector('.card_title')
const gradus = document.querySelector('.card_gradus')
const minMax = document.querySelector('.card_min-max')

async function checkWeather() {
    try {
        const cityName = weatherInputEl.value.trim()
        const apiKey = `https://api.weatherapi.com/v1/forecast.json?key=d8c6141a21074bfbad0120614252102&q=${cityName}&days=7`
        const response = await fetch(apiKey)
        const data = await response.json()
        const forecast = await data.forecast
        const keys = Object.keys(forecast)
        const forecastArr = forecast[keys[0]]
        const da = forecastArr[0]
        const day = await da.day
        const temp = await day.avgtemp_c
        const minTemp = await day.mintemp_c
        const maxTemp = await day.maxtemp_c

        title.textContent = `${cityName[0].toUpperCase()}${cityName.slice(
            1,
            cityName.length
        )}`
        gradus.textContent = `${parseInt(temp)}°`
        minMax.textContent = `Макс: ${parseInt(maxTemp)}°, мин: ${parseInt(
            minTemp
        )}°`
        weatherCardEl.classList.remove('hidden')
    } catch (err) {
        const cityName = weatherInputEl.value.trim()
        document.querySelector(
            '.err-city'
        ).textContent = `Города "${cityName}" не существует!`
    }
}

seacrchBtnel.addEventListener('click', function () {
    if (
        weatherInputEl.value.trim() == 0 ||
        weatherInputEl.value.trim() == '' ||
        weatherInputEl.value.trim() == undefined ||
        weatherInputEl.value.trim() == null
    ) {
        document.querySelector('.err-city').textContent = `Введите город!`
    } else {
        checkWeather()
        document.querySelector('.err-city').textContent = ''
        document.querySelector('.card').classList.add('hidden')
    }

    weatherInputEl.value = ''
})
