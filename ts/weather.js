"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const weatherInput = document.querySelector('.search_input');
const searchButton = document.querySelector('.search_btn');
const weatherCard = document.querySelector('.card');
const title = document.querySelector('.card_title');
let gradus = document.querySelector('.card_gradus');
let minMax = document.querySelector('.card_min-max');
const API_KEY = 'd8c6141a21074bfbad0120614252102';
function checkWeather(result) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!result)
            return;
        if (weatherInput) {
            weatherInput.placeholder = 'Введите город...';
        }
        try {
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${result}&days=7`;
            const response = yield fetch(url);
            const data = yield response.json();
            if (!data.forecast || !weatherCard || !title || !gradus || !minMax)
                return;
            const day = data.forecast.forecastday[0].day;
            title.textContent = data.location.name;
            gradus.textContent = `${Math.round(day.avgtemp_c)}`;
            minMax.textContent = `Макс: ${Math.round(day.maxtemp_c)}°, Мин ${Math.round(day.mintemp_c)}`;
            weatherCard.classList.remove('hidden');
            if (weatherInput) {
                weatherInput.textContent = '';
            }
        }
        catch (error) {
            if (error instanceof Error) {
                if (weatherInput) {
                    weatherInput.placeholder = `Ошибка: ${error.message}`;
                }
            }
        }
    });
}
function handleEvent(event) {
    if (!weatherInput)
        return;
    if (event.type === 'click' || (event instanceof KeyboardEvent && event.key === 'Enter')) {
        checkWeather(weatherInput.value.trim());
        weatherInput.value = '';
    }
}
function getUserLocation() {
    if (!navigator.geolocation || !weatherInput)
        return;
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        checkWeather(`${latitude},${longitude}`);
    }, (error) => {
        weatherInput.placeholder = `Ошибка определения местоположения: ${error.message}`;
    });
}
document.addEventListener('DOMContentLoaded', getUserLocation);
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', handleEvent);
weatherInput === null || weatherInput === void 0 ? void 0 : weatherInput.addEventListener('keydown', handleEvent);
