function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayforecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastday) {
    forecastHTML =
      forecastHTML +
      `
 <div class="col">
                <div class="days" style="width: 5rem">
                  <div class="card-body">
                    <h5 class="card-title">${formatday(forecastday.time)}</h5>
                    <img
                      id="icon-forcasrt"
                      src= "${forecastday.condition.icon_url}"
                      alt="clear"
                    />
                    <p class="card-text">${Math.round(
                      forecastday.temperature.maximum
                    )}°<br />${Math.round(forecastday.temperature.minimum)}°</p>
                  </div>
                </div>
              </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}
function searchCity(city) {
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";

  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Berlin");

let searchform = document.querySelector("#search-form");

searchform.addEventListener("submit", search);

function getForecast(coordinates) {
  let apikey = "0adcta485017f6304b2012ac19o8bca3";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apikey}&unit=metric`;

  axios.get(apiUrl).then(displayforecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let message = `${temperature}`;
  let degree = document.querySelector(".city-degree");
  degree.innerHTML = message;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let description = response.data.weather[0].description;
  let descript = document.querySelector("#picture");
  descript.innerHTML = description;
  let humi = response.data.main.humidity;
  let humidity = document.querySelector(".humidity-weather");
  humidity.innerHTML = humi;
  let wind = response.data.wind.speed;
  let windy = document.querySelector(".wind-weather");
  windy.innerHTML = wind;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function showTemperaturelocation(response) {
  let temprature = Math.round(response.data.main.temp);
  let h3 = document.querySelector(".city-degree");
  h3.innerHTML = temprature;
  let locationname = response.data.name;
  let h1 = document.querySelector("#city");
  h1.innerHTML = locationname;
  let description = response.data.weather[0].description;
  let descript = document.querySelector("#picture");
  descript.innerHTML = description;
  let humi = response.data.main.humidity;
  let humidity = document.querySelector(".humidity-weather");
  humidity.innerHTML = humi;
  let wind = response.data.wind.speed;
  let windy = document.querySelector(".wind-weather");
  windy.innerHTML = wind;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function clicking(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperaturelocation);
  });
}

let button = document.querySelector("#mylocation");
button.addEventListener("click", clicking);
