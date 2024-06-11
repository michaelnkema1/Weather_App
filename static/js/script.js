const apiKey = '5fb63cfbb76cfe63bfc8b54e0519a845'; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherInfo = document.getElementById('weather-info');

searchButton.addEventListener('click', async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    weatherInfo.textContent = 'Please enter a city name.';
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const weatherData = await response.json();

    if (weatherData.cod === '404') {
      weatherInfo.textContent = 'City not found.';
      return;
    }

    const city = weatherData.name;
    const temperature = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;

    weatherInfo.innerHTML = `
      <h3>Weather in ${city}</h3>
      <p>Temperature: ${temperature}°C</p>
      <p>Description: ${description}</p>
    `;
  } catch (error) {
    console.error(error);
    weatherInfo.textContent = 'An error occurred. Please try again later.';
  }
});
