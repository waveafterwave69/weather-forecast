const weatherInputEl = document.querySelector('.search_input')
const searchBtnEl = document.querySelector('.search_btn')
const weatherCardEl = document.querySelector('.card')
const title = document.querySelector('.card_title')
const gradus = document.querySelector('.card_gradus')
const minMax = document.querySelector('.card_min-max')
const errorEl = document.querySelector('.search_input')
// err-city

const apiKey = 'd8c6141a21074bfbad0120614252102'

async function checkWeather(query) {
    try {
        if (!query) {
            errorEl.placeholder = `Не удалось найти город..`
            errorEl.classList.add('error')
            return
        }

        errorEl.placeholder = 'Введите город...'


        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7`
        const response = await fetch(url)
        const data = await response.json()

        // if (!data.forecast) {
        //     throw new Error('Неверный ответ от API')
        // }

        const forecastArr = data.forecast.forecastday[0]
        const day = forecastArr.day

        title.textContent = `${data.location.name}`
        gradus.textContent = `${Math.round(day.avgtemp_c)}°`
        minMax.textContent = `Макс: ${Math.round(day.maxtemp_c)}°, мин: ${Math.round(day.mintemp_c)}°`

        weatherCardEl.classList.remove('hidden')
        errorEl.textContent = ''
    } catch (err) {
        errorEl.placeholder = `Ошибка: ${err.message}`
    }
}

function handleEvent(e) {
    if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
        checkWeather(weatherInputEl.value.trim())
        weatherInputEl.value = ''
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                checkWeather(`${latitude},${longitude}`) // Передаём координаты в API
            },
            (error) => {
                errorEl.placeholder = `Ошибка определения местоположения: ${error.message}`
            }
        )
    } else {
        errorEl.placeholder = 'Геолокация не поддерживается вашим браузером.'
    }
}

document.addEventListener('DOMContentLoaded', getUserLocation)

searchBtnEl.addEventListener('click', handleEvent)
weatherInputEl.addEventListener('keydown', handleEvent)
