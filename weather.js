let appId = '150264657cbfd69e885923082532aa13';
let units = 'metric';
//search method can be zip or city name
let searchMethod;


/*
check if searchTerm is 5 in length and if every element in it is a number. If yes, the searchMethod is zip. otherwise it is the city, q
*/
function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

/*
call the URL for the API and search for value used in searchMethod, give API key as app id and that unit to be used is metric units, and then return the HTTP response as JSON element, and then cal init function.
*/
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=150264657cbfd69e885923082532aa13&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

/*
show the result on dev console.
Change background according to daa obtained from the weather JSON element
*/
function init(resultFromServer) {
    console.log(resultFromServer);
    switch (resultFromServer.weather[0].main) {
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("thunderstorm.jpg")';
            break;
        case 'Drizzle':
        case 'Rain':
            document.body.style.backgroundImage = 'url("img/rain.jpg)';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("img/snow.jpg)';
            break;
        case 'Atmosphere':
            document.body.style.backgroundImage = 'url("img/atmosphere.jpg)';
            break;
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/sunny.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
            break;
        default:
            document.body.style.backgroundImage = 'url("img/default.jpg")';
            break;

    }
}

let weatherDescriptionHeader = document.getElementById('weather-description-header');
let temperature = document.getElementById('temperature');
let windSpeed = document.getElementById('wind-speed');
let humidity = document.getElementById('humidity');
let cityName = document.getElementById('city-name');
let weatherIcon = document.getElementById('weather-icon');

/*
get search term input
*/
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm)
        searchWeather(searchTerm);
})
