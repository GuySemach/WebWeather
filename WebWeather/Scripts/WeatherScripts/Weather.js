window.weather = (function () {
    var weather = {};

    debugger; 

    weather.getFragment = function getFragment() {
        if (window.location.hash.indexOf("#") === 0) {
            return parseQueryString(window.location.hash.substr(1));
        } else {
            return {};
        }
    };


    return weather;
})();