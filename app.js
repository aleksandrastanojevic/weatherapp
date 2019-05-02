document.getElementById("weather").addEventListener("click", function () {
    //preuzima lokaciju
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //koordinate mesta
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            getWeather(lat, long);
        });
    }
    //u slucaju da browser ne podrzava navigator
    else {
        window.alert("Unknown location!");
    }
});

function getWeather(lat, long) {
    //api key
    const url = `https://api.darksky.net/forecast/32c3841090087c04afdda038c827a3b3/${lat},${long}` + `?format=jsonp&callback=showWeather`;
    const script = document.createElement("script");
    //script za darksky api
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);

};

//pretvara temperaturu u celzijuse
function toDegreeCelsius(c) {
    return Math.round((c - 32) * 5 / 9);
};

window.onload = function () {
    //prikaz pre izvlacenja podataka, loader
    humidity = document.getElementById("humidity");
    weatherIcon = document.getElementById("weatherIcon");
    pressure = document.getElementById("pressure");
    uvIndex = document.getElementById("uvIndex");
    temperature = document.getElementById("currentTemp");
    temperatureIcon = document.getElementById("temperatureIcon");
    feelsLike = document.getElementById("feelsLike");
    precipitation = document.getElementById("precipitation");
    currentLocation = document.getElementById("currentLocation");
    summary = document.getElementById("summary");
};

function showWeather(data) {
    //html elementi koje treba popuniti dinamicki
    weatherIcon.src = `images/${data.currently.icon}.png`;
    humidity.innerHTML = `Humidity: ${Math.round(data.currently.humidity * 100)}%`;
    pressure.innerHTML = `Pressure: ${data.currently.pressure.toFixed()}mb`;
    uvIndex.innerHTML = `UV Index: ${data.currently.uvIndex}`;   
    temperatureIcon.src = "images/termometer.png";
    temperature.innerHTML = `${toDegreeCelsius(data.currently.temperature)}°C`;  
    precipitation.innerHTML = `Precipitation probability: ${Math.round(data.currently.precipProbability * 100)}%`;
    feelsLike.innerHTML = `Feels like: ${toDegreeCelsius(data.currently.apparentTemperature)}°C`;        
    currentLocation.innerHTML = `Current Location: ${data.timezone}`;
    summary.innerHTML = `Weather Summary: ${data.currently.summary}`;
    document.getElementById("currentLocation").style.backgroundColor = "rgba(132, 172, 212, 0.5)";
    document.getElementById("summary").style.backgroundColor = "rgba(132, 172, 212, 0.5)";

};
