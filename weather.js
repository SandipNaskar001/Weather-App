const apikey="1c7701f9c922686c4942246d7c6818e2"

const weatherData=document.querySelector(".weather-data")
const cityEl=document.querySelector("#city-name")
const fromEl=document.querySelector("form")
const imgIcon=document.querySelector(".icon")



fromEl.addEventListener("submit",(e)=>{
    e.preventDefault()
    const cityval=cityEl.value
    getWeatherData(cityval)

    if (cityval === "") {
        alert("Please enter a city name");
        return;
    }
})

async  function getWeatherData(cityval)
{
    try{

    
   
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=${apikey}&units=metric`)
        if(!response.ok)
        {
        throw new Error("Network response is not ok")
        }
            const data=await response.json()
            console.log(data);
          const tempa=  Math.floor (data.main.temp)
          const descp=data.weather[0].description
          const icon=data.weather[0].icon
        weatherData.querySelector(".temp").textContent=`${tempa}°C`
        weatherData.querySelector(".desc").textContent=`${descp}`
        imgIcon.innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

        const details=[
            `Feels Like: ${Math.floor(data.main.feels_like)}`,
            `Humidity:${data.main.humidity}%`,
            `wind speed: ${data.wind.speed} m/s`
        ]
        weatherData.querySelector(".details").innerHTML=details.map((detail)=>
        {
            return `<div>${detail}</div>`
        }).join("")


    }
    catch(err)
    {
    weatherData.querySelector(".temp").textContent="Error"
        weatherData.querySelector(".desc").textContent="City not found"
    }

}

