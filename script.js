let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
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
let day = days[now.getDay()];

let time = document.querySelector(".info");
time.innerHTML = `${day} ${hours}:${minutes}`;

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

searchCity("Sydney");

let searchform = document.querySelector("#search-form");

searchform.addEventListener("submit", search);

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
    console.log(apiUrl);
    axios.get(apiUrl).then(showTemperaturelocation);
  });
}

let button = document.querySelector("#mylocation");
button.addEventListener("click", clicking);
