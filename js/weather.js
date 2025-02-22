const weatherInputEl = document.querySelector('.search_input')
const searchBtnEl = document.querySelector('.search_btn')
const weatherCardEl = document.querySelector('.card')
const title = document.querySelector('.card_title')
const gradus = document.querySelector('.card_gradus')
const minMax = document.querySelector('.card_min-max')
const errorEl = document.querySelector('.err-city')

async function checkWeather() {
    try {
        const cityName = weatherInputEl.value.trim()
        if (!cityName) {
            errorEl.textContent = `Введите город!`
            return
        }

        const apiKey = `https://api.weatherapi.com/v1/forecast.json?key=d8c6141a21074bfbad0120614252102&q=${cityName}&days=7`
        const response = await fetch(apiKey)
        const data = await response.json()

        if (!data.forecast) {
            throw new Error('Неверный ответ от API')
        }

        const forecastArr = data.forecast.forecastday[0]
        const day = forecastArr.day

        title.textContent = `${cityName[0].toUpperCase()}${cityName.slice(1)}`
        gradus.textContent = `${Math.round(day.avgtemp_c)}°`
        minMax.textContent = `Макс: ${Math.round(day.maxtemp_c)}°, мин: ${Math.round(day.mintemp_c)}°`

        weatherCardEl.classList.remove('hidden')
        errorEl.textContent = ''
    } catch (err) {
        errorEl.textContent = `Города "${weatherInputEl.value.trim()}" не существует!`
    }
}

function handleEvent(e) {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
        checkWeather()
        weatherInputEl.value = ''
    }
}

searchBtnEl.addEventListener('click', handleEvent)
weatherInputEl.addEventListener('keydown', handleEvent)
