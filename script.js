let searchinp = document.querySelector(".weather-search")
let city = document.querySelector(".city-name");
let day = document.querySelector(".day-name")
let humidityval = document.querySelector(".side-data-humid>.value")
let wind = document.querySelector(".side-data-wind>.value")
let pressure = document.querySelector(".side-data-pressure >.value")
let temp = document.querySelector(".temp-value")


let apikey = "0ad0b278b6e7ba8415632e440bca1bb9"

let weatherenpoint = "https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=" + apikey

let searchresult = async (city) => {
    let result = weatherenpoint + "&q=" + city;
    let response = await fetch(result);
    let weatherdata = await response.json();
    return weatherdata;
}


searchinp.addEventListener('keydown', async (e) => {
    if (e.keyCode === 13) {
        let weatherdata = await searchresult(searchinp.value);
        updatedata(weatherdata);
        console.log(weatherdata);

    }
})



let updatedata = (data) => {

    city.textContent = data.name + ',' + data.sys.country;
    day.textContent = dayofweek();
    humidityval.textContent = data.main.humidity;

    let winddirection;
    let deg = data.wind.deg;
    if (deg > 45 && deg < 135) { winddirection = "East" }
    else if (deg > 135 && deg < 225) {winddirection = "South"}
    else if (deg > 225 && deg < 315) {winddirection = "West"}
    else if (deg > 315 && deg < 45) {winddirection = "North"}

    wind.textContent = winddirection + ',' + data.wind.speed;
    pressure.textContent = data.main.pressure;


}

let dayofweek = () => {
    return new Date().toLocaleDateString('en-EN', { 'weekday': 'long' });
}

