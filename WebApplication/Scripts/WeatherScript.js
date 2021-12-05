window.weather = (function () {
    var weather = {};
    var geo = {};

    Vue.component("weatherReport", {
        props: {
            cityName: {
                type: Text,
                required: true
            }
        },
        template: `
            <div v-for= "weather in cityDetails.weather" >
                    <h1>{{ name }}</h1>
                    <h2>{{ weather.main }}</h2>
                    <h2>{{ weather.description }}</h2>
                </div>`,
        data() {
            return null;
        }
    });

    var app = new Vue({
        el: '#app',
        data: {
            info: null,
            cities:
                [
                    "Select ...",
                    "My current location",
                    "Tel Aviv",
                    "London",
                    "Paris"
                ],
            cityDetails: null,
            isCitySelected: false,
            isCitySelectedChanged: false,
            isMoreDetails: false,
            errored: false
        },
        methods: {
            onCitySelect: function () {
                this.isCitySelected = true;
            },
            onMoreDetailsClick: function () {
                if (this.isMoreDetails) {
                    this.isMoreDetails = false;
                }
                else {
                    this.isMoreDetails = true;
                }
            },
            onCityChange: function (value) {
                this.isCitySelectedChanged = true;
                this.isCitySelected = true;
                this.isMoreDetails = false;

                if (value.target.selectedOptions.length > 0) {
                    var controllerUrl = 'https://localhost:44305/Weather/';
                    var actionName = 'GetWeatherReport';
                    var selectedCity = value.target.selectedOptions[0].value;
                    if (selectedCity == "My current location") {
                        try {
                            var geoLoc = weather.geoPositionCurrentUser();
                            selectedCity = geoLoc.lat + ';' + geoLoc.lon;
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    weather.postData(controllerUrl + actionName, { CityName: selectedCity })
                        .then(data => {
                            this.errored = false;

                            this.cityDetails = data.openweathermap;
                            this.cityDetails.weatherMain = data.openweathermap.weather[0].main;
                            this.cityDetails.weatherDescription = data.openweathermap.weather[0].description;
                            this.cityDetails.weatherTemp = data.openweathermap.main.temp;
                            this.cityDetails.weatherFeelsLike = data.openweathermap.main.feels_like;
                            this.cityDetails.weatherHumidity = data.openweathermap.main.humidity;
                            console.log("success");
                            console.log(data);
                        })
                        .catch(
                            error => {
                                this.errored = true
                                console.log("error");
                                console.log(error)
                            });
                }
            }
        }
    });

    weather.postData = async function (url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });

        return response.json();
    }

    weather.geoPositionCurrentUser = function () {
        if (navigator.geolocation) {
            var resp = navigator.geolocation.getCurrentPosition(weather.getLocation);
            return resp;
        } else {
            return "Geolocation is not supported by this browser.";
        }
    }

    weather.getLocation = function (position) {
        geo.lat = position.coords.latitude;
        geo.lon = position.coords.longitude;
        return geo;
    }

    return weather;
})();