
const apikey = "ddf717f3f0a3fbf87de02aabea2721a0";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather_icon");

async function checkweather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            
            // Update the DOM with weather information
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

            if(data.weather[0].main=="Clouds"){
                            weathericon.src="clouds.png";
                        }
                        else if(data.weather[0].main=="Clear"){
                            weathericon.src="clear.png";
                        }
                        else if(data.weather[0].main=="Rain"){
                            weathericon.src="rain.png";
                        }
                        else if(data.weather[0].main=="Drizzle"){
                            weathericon.src="drizzle.png";
                        }
                        else if(data.weather[0].main=="Mist"){
                            weathericon.src="mist.png";
                        }
            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});
