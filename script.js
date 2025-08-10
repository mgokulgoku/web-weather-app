// Weather App Script

// API Key
const apiKey = "e14c24c30389df00ab3a1e07d62e33e3";

// Get HTML Elements
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

// Button Click Event
getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name</p>";
        return;
    }

    // Create API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Get Weather Data
    fetch(apiUrl)
        .then((response) =>{
            return response.json()
        })
        .then((data) => {
            console.log(data);

            // Check for errors
            if (data.cod !== 200) {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
                return;
            }

            // Show Weather Info
            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = "<p>Error fetching data</p>";
            console.error(error);
        });
});