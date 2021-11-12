let searchinp = document.querySelector(".weather-search")
let city = document.querySelector(".city-name");
let day = document.querySelector(".day-name")
let humidityval = document.querySelector(".side-data-humid>.value")
let wind = document.querySelector(".side-data-wind>.value")
let pressure = document.querySelector(".side-data-pressure >.value")
let tempbase = document.querySelector(".temp-value")


let five_day_day = document.querySelectorAll('.weather-forecast-day');
let five_day_temp = document.querySelectorAll('.temp-value-sub')

let apikey = "0ad0b278b6e7ba8415632e440bca1bb9"

let weatherenpoint = "https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=" + apikey;
let fiveDayPoint = "https://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=" + apikey;

// This code is for main data

let searchresult = async (city) => {
    let result = weatherenpoint + "&q=" + city;
    let response = await fetch(result);
    let weatherdata = await response.json();
    return weatherdata;
}

// This code is for five temp result
let fiveData = async (city) => {
    let fiveDataResult = fiveDayPoint + "&q=" + city;
    let fiveDayWeather = await fetch(fiveDataResult);
    let fiveDayData = await fiveDayWeather.json();
    fiveDataUpdate()
    return fiveDayData;
}


searchinp.addEventListener('keydown', async (e) => {
    if (e.keyCode === 13) {
        let weatherdata = await searchresult(searchinp.value);
        let fiveDayData = await fiveData(searchinp.value);
        updatedata(weatherdata);
        console.log(fiveDayData);
        //Assigned list to new object
        let fiveDaylist = fiveDayData.list;
        //looping through fiveday array-object

        var fiveTemp = [];
        fiveDaylist.forEach(list => {

            let dateText = list.dt_txt


            if (dateText.includes('12:00:00') == true) { fiveTemp.push(list.main.temp) }
        })
            for (let i = 0; i < 5; i++) {

            five_day_temp[i].innerHTML = fiveTemp[i];
        }

    }})




    let updatedata = (data) => {

        city.textContent = data.name + ',' + data.sys.country;
        day.textContent = dayofweek();
        humidityval.textContent = data.main.humidity;
        tempbase.textContent = data.main.temp;


        let winddirection;
        let deg = data.wind.deg;
        {
            if (deg > 45 && deg < 135) { winddirection = "East" }
            else if (deg > 135 && deg < 225) { winddirection = "South" }
            else if (deg > 225 && deg < 315) { winddirection = "West" }
            else if (deg > 315 || deg < 45) { winddirection = "North" }
        }

        wind.textContent = winddirection + ',' + data.wind.speed;
        pressure.textContent = data.main.pressure;
        tempbase.textContent = data.main.temp < 0 ?
            "-" + Math.round(data.main.temp) :
            "+" + Math.round(data.main.temp);
    }




    let dayofweek = () => {
        return new Date().toLocaleDateString('en-EN', { 'weekday': 'long' });
    }

    let fiveDataUpdate = () => {

        fDate = new Date();
        let fDay = fDate.getDay();
        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Assigninig Day incrementaly
        for (let i = 0; i < 5; ++i) {
            let number2 = i + 1
            if (fDay + number2 > 6) {
                number2 = ((fDay + number2) - 6) - 1;

                five_day_day[i].innerHTML=(weekday[number2]);
            }

            else {
                five_day_day[i].innerHTML=(weekday[number2 + fDay]);
            }
        }
    }



