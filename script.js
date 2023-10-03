const apikey ="868ebe520a54f77db4b7b263200d39e3";
const searchbtn = document.getElementById('searchBtn');
const city = document.getElementById('location');
const tem =document.getElementById('temp');
const degF = document.getElementById('deg-f');
const degC = document.getElementById('deg-c');
const weatherIcon = document.getElementById('weather-img');
function checkWeather(city){
    // const city = document.getElementById('location');
    if(city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector("#temp").innerHTML = Math.round(data.main.temp);
                document.querySelector("#city").innerHTML = city;
                document.querySelector("#humidity").innerHTML = data.main.humidity + " %";
                document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";
                document.querySelector("#desc").innerHTML = data.weather[0].description;
                // document.querySelector(".right #time").innerHTML = ;
        
        
                //fatch 7-day forecast data
                fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=7&q=${city}&appid=${apikey}`)
                .then(response => response.json())
                .then(forecastData => {
                    const forecastChart = document.getElementById('forecastChart').getContext('2d');
                    const dates =[];
                    const temperatures = [];
                    const humidities = [];
                    const weatherConditions = [];
        
                    // Extract data for the next 7 days
                    forecastData.list.forEach(item => {
                        const day = new Date(item.dt * 1000);
                        const date = day.toLocaleDateString();
                        const temperature = item.main.temp;
                        const humidity = item.main.humidity;
                        const weatherIcon = item.weather[0].icon;
                    
                        dates.push(date);
                        temperatures.push(temperature);
                        humidities.push(humidity);
                        weatherConditions.push(weatherIcon);
                    });
        
                    
                    //create temperature, humidity, and weather condition charts
                    const colorArea = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                          const {ctx} = chart;
                          ctx.save();
                          ctx.globalCompositeOperation = 'destination-over';
                          ctx.fillStyle = options.color || '#fafafa4d';
                          ctx.fillRect(0, 0, chart.width, chart.height);
                          ctx.restore();
                        }
                      };
                    
                      var graph = Chart.getChart("forecastChart");
                      if(graph){
                        graph.destroy();
                      }
                    graph = new Chart(forecastChart, {
                        type: 'line',
                        data: {
                            labels:dates,
                            datasets:[
                                {
                                    label:'Temperature (?C)',
                                    data: temperatures,
                                    borderColor:'blue',
                                    backgroundColor:'rgba(0, 0, 255, 0.1)'
                                }
                            ],
                        },
                        plugins:[colorArea]
                    });
                })
                .catch(error => {
                    console.error('Error fetching forcast data:',error);
                });
            })
            .catch(error => {
                console.error('Error fetching weather data:',error);
            });
        }
    }
    checkWeather("Delhi")
    searchbtn.addEventListener("click", ()=>{
    	checkWeather(city.value);
    })

                    





	// document.querySelector(".right #time").innerHTML = dateObj.getUTCDay()+", "+dateObj.getUTCHours()+":"+dateObj.getUTCMinutes();

                // if(data.weather[0].main == "clouds"){
//                 weatherIcon.src = "./images/clouds.png";
//                 }
//                 else if(data.weather[0].main == "Clear"){
//                     weatherIcon.src = "images/clear.png";
//                 }
//                 else if(data.weather[0].main == "Rain"){
//                     weatherIcon.src = "images/rain.png";
//                 }
//                 else if(data.weather[0].main == "Drizzle"){
//                     weatherIcon.src = "images/drizzle.png";
//                 }
//                 else if(data.weather[0].main == "Mist"){
//                     weatherIcon.src = "images/mist.png";
//                 }
//         )
// }

// checkWeather("Delhi");
// searchBtn.addEventListener("click", ()=>{
// 	checkWeather(searchBox.value);
// })

