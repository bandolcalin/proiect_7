window.addEventListener("load", () => {

    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let proxy = "https://cors-anywhere.herokuapp.com/";
            let apiPosition = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f626149a160e8b77d48a900fb3cccc0e`;

            fetch(apiPosition)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    let { temp, humidity, pressure, temp_max, temp_min } = data.main;
                    let description = data.weather[0].description;

                    let temperatureDegree = document.querySelector('.temp-now');
                    let temperatureDescription = document.querySelector('.description');
                    let humidityNow = document.querySelector('.humidity');
                    let pressureNow = document.querySelector('.pressure');
                    let tempMax = document.querySelector('.max-temp');
                    let tempMin = document.querySelector('.min-temp');
                    let iconNow = document.querySelector('.icon-now');

                    const icon_Now = iconNow;
                    icon_Now.innerHTML = `<img id="icon-now" src="icons/${data.weather[0].icon}.png"/>`;
                    temperatureDegree.textContent = Math.round(temp - 273.15) + "°C";
                    temperatureDegree.addEventListener('click', () => {
                        if (temperatureDegree.textContent === Math.round(temp - 273.15) + "°C") {
                            temperatureDegree.textContent = Math.round(temp * 9 / 5 - 459.67) + "°F";
                        } else {
                            temperatureDegree.textContent = Math.round(temp - 273.15) + "°C";
                        };
                    });
                    temperatureDescription.textContent = description;
                    humidityNow.textContent = humidity + "%";
                    pressureNow.textContent = pressure;
                    tempMax.textContent = Math.round(temp_max - 273.15) + "°C";
                    tempMax.addEventListener('click', () => {
                        if (tempMax.textContent === Math.round(temp_max - 273.15) + "°C") {
                            tempMax.textContent = Math.round(temp_max * 9 / 5 - 459.67) + "°F"
                        } else {
                            tempMax.textContent = Math.round(temp_max - 273.15) + "°C";
                        };
                    });
                    tempMin.textContent = Math.round(temp_min - 273.15) + "°C";
                    tempMin.addEventListener('click', () => {
                        if (tempMin.textContent === Math.round(temp_min - 273.15) + "°C") {
                            tempMin.textContent = Math.round(temp_min * 9 / 5 - 459.67) + "°F";
                        } else {
                            tempMin.textContent = Math.round(temp_min - 273.15) + "°C";
                        };
                    });
                })
        });
    }
});

let displayButton = document.querySelector('.display-now');
displayButton.addEventListener("click", weather);

function weather() {

    let temperatureDegree = document.querySelector('.temp-now');
    let descriptionNow = document.querySelector('.description');
    let humidityNow = document.querySelector('.humidity');
    let pressureNow = document.querySelector('.pressure');
    let tempMax = document.querySelector('.max-temp');
    let tempMin = document.querySelector('.min-temp');
    let search = document.getElementById("search");
    let tempForecast = document.querySelector('.temp-forecast');
    let dayForecast = document.querySelector('.day-forecast');
    let descriptionForecast = document.querySelector('.description-forecast');
    let iconForecast = document.querySelector('.icon-forecast');
    let iconNow = document.querySelector('.icon-now');
    let FORECAST = document.querySelector('.forecast-list');

    let apiKey = '1a829003aa7b2d5f4541334ae83516ef';
    let city = search.value;

    const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const forecast = `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${city}`;

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const { temp, humidity, pressure, temp_max, temp_min } = data.main;
            const description = data.weather[0].description;
            const icon_Now = iconNow;
            icon_Now.innerHTML = `<img id="icon-now" src="icons/${data.weather[0].icon}.png"/>`;
            temperatureDegree.textContent = Math.round(temp - 273.15) + "°C";
            temperatureDegree.addEventListener('click', () => {
                if (temperatureDegree.textContent === Math.round(temp - 273.15) + "°C") {
                    temperatureDegree.textContent = Math.round(temp * 9 / 5 - 459.67) + "°F";
                } else {
                    temperatureDegree.textContent = Math.round(temp - 273.15) + "°C";
                };
            });
            humidityNow.textContent = humidity + "%";
            pressureNow.textContent = pressure;
            tempMax.textContent = Math.round(temp_max - 273.15) + "°C";
            tempMax.addEventListener('click', () => {
                if (tempMax.textContent === Math.round(temp_max - 273.15) + "°C") {
                    tempMax.textContent = Math.round(temp_max * 9 / 5 - 459.67) + "°F";
                } else {
                    tempMax.textContent = Math.round(temp_max - 273.15) + "°C";
                };
            });
            tempMin.textContent = Math.round(temp_min - 273.15) + "°C";
            tempMin.addEventListener('click', () => {
                if (tempMin.textContent === Math.round(temp_min - 273.15) + "°C") {
                    tempMin.textContent = Math.round(temp_min * 9 / 5 - 459.67) + "°F";
                } else {
                    tempMin.textContent = Math.round(temp_min - 273.15) + "°C";
                };
            });
            descriptionNow.textContent = description;
        });

    fetch(forecast)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var forecastlist = data.list;

            console.log(data);
            let i = 0;

            forecastlist.forEach(dayBlock => {

                dayBlock = document.createElement("tr");
                const dayTemp = document.createElement("tr")
                const dayDescription = document.createElement("tr");
                const iconID = document.createElement("tr");
                i++;
                iconID.innerHTML = `<img src="icons/${data.list[i - 1].weather[0].icon}.png"/>`;
                dayBlock.innerHTML = data.list[i - 1].dt_txt;
                const tempForec = data.list[i - 1].main.temp
                dayTemp.innerHTML = Math.round(tempForec) + "°C";
                dayTemp.addEventListener('click', () => {
                    if (dayTemp.textContent === Math.round(tempForec) + "°C") {
                        dayTemp.textContent = Math.round(tempForec + 33.8) + "°F";
                    } else {
                        dayTemp.textContent = Math.round(tempForec) + "°C";
                    };
                });
                dayDescription.innerHTML = data.list[i - 1].weather[0].description;
                dayForecast.id = "dayForecast";
                tempForecast.id = "tempForecast";
                dayForecast.appendChild(dayBlock);
                tempForecast.appendChild(dayTemp);
                descriptionForecast.appendChild(dayDescription);
                iconForecast.appendChild(iconID);
            });
        });
};