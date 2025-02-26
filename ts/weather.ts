const weatherInput = document.querySelector('.search_input') as HTMLInputElement | null;
const searchButton = document.querySelector('.search_btn') as HTMLButtonElement | null;

const weatherCard = document.querySelector('.card') as HTMLDivElement | null;
const title = document.querySelector('.card_title') as HTMLElement | null;
let gradus = document.querySelector('.card_gradus') as HTMLDivElement | null;
let minMax = document.querySelector('.card_min-max') as HTMLDivElement | null;

const API_KEY: string = 'd8c6141a21074bfbad0120614252102';

interface WeatherData {
    location: {
        name: string
    }
    forecast: {
        forecastday: {
            day: {
                avgtemp_c: number,
                maxtemp_c: number,
                mintemp_c: number;
            }
        }[]
    }
}

async function checkWeather(result: string): Promise<void> {
    if (!result) return;

        if (weatherInput) {
            weatherInput.placeholder = 'Введите город...';
        }

        try {
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${result}&days=7`
            const response = await fetch(url);
            const data = await response.json();

            if (!data.forecast || !weatherCard  || !title || !gradus || !minMax) return;

            const day = data.forecast.forecastday[0].day;

            title.textContent = data.location.name;
            gradus.textContent = `${Math.round(day.avgtemp_c)}`;
            minMax.textContent = `Макс: ${Math.round(day.maxtemp_c)}°, Мин ${Math.round(day.mintemp_c)}`;

            weatherCard.classList.remove('hidden');

            if (weatherInput) {
                weatherInput.textContent = '';
            }

        }
        catch (error: unknown) {
            if (error instanceof Error) {
                if (weatherInput) {
                    weatherInput.placeholder = `Ошибка: ${error.message}`;
                }
            }
        }
}

function handleEvent (event: MouseEvent | KeyboardEvent): void {
    if (!weatherInput) return;

    if (event.type === 'click' || (event instanceof KeyboardEvent && event.key === 'Enter')) {
        checkWeather(weatherInput.value.trim());
        weatherInput.value = '';
    }
}

function getUserLocation (): void {
    if (!navigator.geolocation || !weatherInput) return;

        navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {
            const { latitude, longitude } = position.coords;
            checkWeather(`${latitude},${longitude}`);
        },
            (error: GeolocationPositionError): void => {
            weatherInput.placeholder = `Ошибка определения местоположения: ${error.message}`;
            }
            );
}

document.addEventListener('DOMContentLoaded', getUserLocation);

searchButton?.addEventListener('click', handleEvent);
weatherInput?.addEventListener('keydown', handleEvent);
