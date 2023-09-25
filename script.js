const apikey ="868ebe520a54f77db4b7b263200d39e3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector("#location");
const searchBtn = document.querySelector("#submit");
const weatherIcon = document.querySelector("#weather-img");
// const fUnit = document.querySelector("#deg-fahren")
// const cUnit = document.querySelector("#deg-celcius");

async function checkweather(city="Delhi"){
	const response =await fetch(apiUrl + city +`&appid=${apikey}`);
	var data = await response.json();
	let dateObj = new Date(data.dt * 1000);
	console.log(data);

	document.querySelector("#temp").innerHTML = Math.round(data.main.temp);
	document.querySelector("#city").innerHTML = city;
	document.querySelector("#humidity").innerHTML = data.main.humidity + " %";
	document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";
	document.querySelector("#desc").innerHTML = data.weather[0].description;
	// document.querySelector(".right #time").innerHTML = dateObj.getUTCDay()+", "+dateObj.getUTCHours()+":"+dateObj.getUTCMinutes();

	if(data.weather[0].main == "clouds"){
       weatherIcon.src = "./images/clouds.png";
	}
	else if(data.weather[0].main == "Clear"){
		weatherIcon.src = "images/clear.png";
	}
	else if(data.weather[0].main == "Rain"){
		weatherIcon.src = "images/rain.png";
	}
	else if(data.weather[0].main == "Drizzle"){
		weatherIcon.src = "images/drizzle.png";
	}
	else if(data.weather[0].main == "Mist"){
		weatherIcon.src = "images/mist.png";
	}
	
}
checkweather("Delhi");
searchBtn.addEventListener("click", ()=>{
	checkweather(searchBox.value);
})

