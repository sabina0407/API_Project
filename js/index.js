let latitude, longitude;

async function getWeather() {
    const city = document.getElementById('city').value;
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

    try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            latitude = data.results[0].latitude;
            longitude = data.results[0].longitude;
            document.getElementById('city-name').textContent = data.results[0].name;

            await fetchWeatherData();
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

async function fetchWeatherData() {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        const temperature = data.current.temperature_2m;
        const weatherCode = data.current.weather_code;
        const windSpeed = data.current.wind_speed_10m;

        document.getElementById('temperature').textContent = `${temperature}°C`;
        document.getElementById('weather-condition').textContent = getWeatherDescription(weatherCode);
        document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;

        setWeatherIcon(weatherCode);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching weather data. Please try again.');
    }
}

function getWeatherDescription(code) {
    if (code <= 3) return 'Clear';
    if (code <= 49) return 'Cloudy';
    if (code <= 69) return 'Rainy';
    if (code <= 79) return 'Snowy';
    return 'Stormy';
}

function setWeatherIcon(code) {
    const iconElement = document.getElementById('weather-icon');
    if (code <= 3) iconElement.className = 'fas fa-sun';
    else if (code <= 49) iconElement.className = 'fas fa-cloud';
    else if (code <= 69) iconElement.className = 'fas fa-cloud-rain';
    else if (code <= 79) iconElement.className = 'fas fa-snowflake';
    else iconElement.className = 'fas fa-bolt';
}

// getWeather();