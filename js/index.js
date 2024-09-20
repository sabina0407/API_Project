// // Variables to store the latitude and longitude of the requested city
// let latitude, longitude;

// // Function to initiate the weather data retrieval process
// async function getWeather() {
//     const city = document.getElementById('city').value;
//     const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

//     try {
//         const response = await fetch(geocodingUrl);
//         const data = await response.json();

//         if (data.results && data.results.length > 0) {
//             latitude = data.results[0].latitude;
//             longitude = data.results[0].longitude;
//             document.getElementById('city-name').textContent = data.results[0].name;

//             await fetchCurrentWeather();
//             await fetchForecast();
//             document.getElementById('weather-info').style.display = 'block';
//             showCurrentWeather();
//         } else {
//             alert('City not found. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again.');
//     }
// }

// // Function to fetch current weather data
// async function fetchCurrentWeather() {
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
    
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
        
//         document.getElementById('temperature').textContent = `${data.current.temperature_2m}°C`;
//         document.getElementById('humidity').textContent = `Humidity: ${data.current.relative_humidity_2m}%`;
//         document.getElementById('wind-speed').textContent = `Wind: ${data.current.wind_speed_10m} km/h`;
//         document.getElementById('weather-condition').textContent = getWeatherDescription(data.current.weather_code);
        
//         setWeatherIcon(data.current.weather_code);
//     } catch (error) {
//         console.error('Error fetching current weather:', error);
//         alert('Error fetching current weather. Please try again.');
//     }
// }

// // Function to fetch forecast data
// async function fetchForecast() {
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
        
//         const forecastDiv = document.getElementById('forecast');
//         forecastDiv.innerHTML = '';
        
//         for (let i = 0; i < 5; i++) {
//             const date = new Date(data.daily.time[i]);
//             const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
//             const forecastDay = document.createElement('div');
//             forecastDay.className = 'forecast-day';
//             forecastDay.innerHTML = `
//                 <h3>${dayName}</h3>
//                 <p>Max: ${Math.round(data.daily.temperature_2m_max[i])}°C</p>
//                 <p>Min: ${Math.round(data.daily.temperature_2m_min[i])}°C</p>
//                 <p>Precip: ${data.daily.precipitation_sum[i]} mm</p>
//             `;
//             forecastDiv.appendChild(forecastDay);
//         }
//     } catch (error) {
//         console.error('Error fetching forecast:', error);
//         alert('Error fetching forecast. Please try again.');
//     }
// }

// // Function to convert weather code to a human-readable description
// function getWeatherDescription(code) {
//     if (code <= 3) return 'Clear';
//     if (code <= 49) return 'Cloudy';
//     if (code <= 69) return 'Rainy';
//     if (code <= 79) return 'Snowy';
//     return 'Stormy';
// }

// // Function to set the appropriate weather icon based on the weather code
// function setWeatherIcon(code) {
//     const iconElement = document.getElementById('weather-icon');
//     if (code <= 3) {
//         iconElement.className = 'fas fa-sun';
//         iconElement.style.color = '#ffd600';
//     } else if (code <= 49) {
//         iconElement.className = 'fas fa-cloud';
//         iconElement.style.color = '#90a4ae';
//     } else if (code <= 69) {
//         iconElement.className = 'fas fa-cloud-rain';
//         iconElement.style.color = '#4fc3f7';
//     } else if (code <= 79) {
//         iconElement.className = 'fas fa-snowflake';
//         iconElement.style.color = '#b3e5fc';
//     } else {
//         iconElement.className = 'fas fa-bolt';
//         iconElement.style.color = '#ffd600';
//     }
// }

// // Function to show current weather and hide forecast
// function showCurrentWeather() {
//     document.getElementById('current-weather').style.display = 'flex';
//     document.getElementById('forecast').style.display = 'none';
// }

// // Function to show forecast and hide current weather
// function showForecast() {
//     document.getElementById('current-weather').style.display = 'none';
//     document.getElementById('forecast').style.display = 'flex';
// }

// // hide weather info from start
// document.getElementById('weather-info').style.display = 'none';

let latitude, longitude;

document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.querySelector('.get-weather-btn');
    const currentWeatherBtn = document.querySelector('.current-weather-btn');
    const forecastBtn = document.querySelector('.forecast-btn');
    
    getWeatherBtn.addEventListener('click', getWeather);
    currentWeatherBtn.addEventListener('click', showCurrentWeather);
    forecastBtn.addEventListener('click', showForecast);
    
    document.querySelector('.weather-info').style.display = 'none';
});

async function getWeather() {
    const city = document.querySelector('.city-input').value;
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

    try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            latitude = data.results[0].latitude;
            longitude = data.results[0].longitude;
            document.querySelector('.city-name').textContent = data.results[0].name;

            await fetchCurrentWeather();
            await fetchForecast();
            document.querySelector('.weather-info').style.display = 'block';
            showCurrentWeather();
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

async function fetchCurrentWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&timezone=auto`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.querySelector('.temperature').textContent = `${data.current.temperature_2m}°C`;
        document.querySelector('.humidity').textContent = `Humidity: ${data.current.relative_humidity_2m}%`;
        document.querySelector('.wind-speed').textContent = `Wind: ${data.current.wind_speed_10m} km/h`;
        document.querySelector('.weather-condition').textContent = getWeatherDescription(data.current.weather_code);
        
        setWeatherIcon(data.current.weather_code, data.current.is_day);
    } catch (error) {
        console.error('Error fetching current weather:', error);
        alert('Error fetching current weather. Please try again.');
    }
}

async function fetchForecast() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const forecastDiv = document.querySelector('.forecast');
        forecastDiv.innerHTML = '';
        
        for (let i = 0; i < 5; i++) {
            const date = new Date(data.daily.time[i]);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            forecastDay.innerHTML = `
                <h3>${dayName}</h3>
                <p>Max: ${Math.round(data.daily.temperature_2m_max[i])}°C</p>
                <p>Min: ${Math.round(data.daily.temperature_2m_min[i])}°C</p>
                <p>Precip: ${data.daily.precipitation_sum[i]} mm</p>
            `;
            forecastDiv.appendChild(forecastDay);
        }
    } catch (error) {
        console.error('Error fetching forecast:', error);
        alert('Error fetching forecast. Please try again.');
    }
}

function getWeatherDescription(code) {
    if (code <= 3) return 'Clear';
    if (code <= 49) return 'Cloudy';
    if (code <= 69) return 'Rainy';
    if (code <= 79) return 'Snowy';
    return 'Stormy';
}

function setWeatherIcon(code, isDay) {
    const iconElement = document.querySelector('.weather-icon');
    iconElement.className = 'weather-icon fas';

    if (code <= 3) {
        if (isDay) {
            iconElement.className += ' fa-sun sun';
        } else {
            iconElement.className += ' fa-moon moon';
        }
    } else if (code <= 49) {
        iconElement.className += ' fa-cloud cloud';
    } else if (code <= 69) {
        iconElement.className += ' fa-cloud-rain rain';
    } else if (code <= 79) {
        iconElement.className += ' fa-snowflake snow';
    } else {
        iconElement.className += ' fa-bolt storm';
    }
}

function showCurrentWeather() {
    document.querySelector('.current-weather').style.display = 'flex';
    document.querySelector('.forecast').style.display = 'none';
}

function showForecast() {
    document.querySelector('.current-weather').style.display = 'none';
    document.querySelector('.forecast').style.display = 'flex';
}