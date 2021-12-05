window.weather = (function () {
    var weather = {};

    debugger;

    var app = new Vue({
        el: '#app',
        data: {
            info: null,
            cities:
                [
                    "Tel Aviv",
                    "London",
                    "Paris"

                ],
            cityDetails: null,
            isCitySelected: false,
            isCitySelectedChanged: false,
            errored: false
        },
        //mounted() {
        //        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        //        .then(response => (this.info = response))
        //        .catch(
        //            error => {
        //                console.log(error)
        //                this.errored = true
        //            })
        //},
        mounted() {
            fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=6cd960de9861381feba7c74fdb89a49a')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    debugger;
                    this.cityDetails = data;
                })
                .catch(
                    error => {
                        console.log(error)
                        this.errored = true
                    })
        },
        methods: {
            onCitySelect: function () {
                debugger;
                this.isCitySelected = true;
            },
            onCityChange: function (value) {
                debugger;
                this.isCitySelectedChanged = true;
                if (value.target.selectedOptions.length > 0) {
                    var selectedCity = value.target.selectedOptions[0].value;
                        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + selectedCity + '&appid=6cd960de9861381feba7c74fdb89a49a')
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                debugger;
                                this.cityDetails = data;
                            })
                            .catch(
                                error => {
                                    console.log(error)
                                    this.errored = true
                                });
                }
            }
        }


    });

    //var app = new Vue({
    //    el: '#app',
    //    data: {
    //        product: 'Tel Aviv',
    //        isCitySelected: false
    //    },
    //    cities: axios
    //        .get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=6cd960de9861381feba7c74fdb89a49a')
    //        .then(response => (this.info = response))
    //        .catch(
    //            error => {
    //                console.log(error)
    //                this.errored = true
    //            })

    //});

    weather.getFragment = function getFragment() {
        if (window.location.hash.indexOf("#") === 0) {
            return parseQueryString(window.location.hash.substr(1));
        } else {
            return {};
        }
    };


    return weather;
})();