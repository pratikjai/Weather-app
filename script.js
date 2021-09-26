let searchinp = document.querySelector(".weather-search")
let city=document.querySelector(".city-name");
let day = document.querySelector(".day-name")
let humidity = document.querySelector("side-data humid>.value")
let wind = document.querySelector("side-data wind>.value")
let pressure = document.querySelector("side-data pressure>.value")
let temp = document.querySelector (".temp-value")


let apikey = "0ad0b278b6e7ba8415632e440bca1bb9"

let weatherenpoint = "https://api.openweathermap.org/data/2.5/weather?&units=metric&appid="+apikey

let searchresult = async (city) =>
{
    let result = weatherenpoint + "&q=" + city;
    let response = await fetch(result);
    let weatherdata = await response.json();
    return weatherdata;
}


searchinp.addEventListener('keydown',async (e)=>
{
    if (e.keyCode === 13)
    {
        let weatherdata = await searchresult(searchinp.value);
        updatedata(weatherdata);
    }
})

let updatedata = (data) =>
{
    city.textContent = data.name + ',' + data.sys.country;
}