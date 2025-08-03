//   https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={apiKey}

const searchBtn = document.querySelector('.searchBtn');
const inputBox =  document.querySelector('#inputBox');
const weatherImg = document.querySelector('.weatherImg')
const temperature = document.querySelector('.temperature')
const discription = document.querySelector('.discription')
const humdity = document.querySelector('#humdity')
const windSpeed = document.querySelector('#wind-speed')

const weatherBody = document.querySelector('.weather-body')
const errorMsg = document.querySelector('#errorMsg')




async function checkWeather(city){

    const apiKey = '1d805868f97d85c9191e61f6bf24c2f6'

    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    

    let weatherData = await fetch(`${url}`);
    const response = await weatherData.json()
    
    console.log(response);



// if city not found

   if (response.cod === `404`) {
    inputBox.value = response.message;
    errorMsg.style.display='block'
    errorMsg.innerHTML = 'Sorry, Location not found!!'
discription.innerHTML = '-';
    temperature.innerHTML = 0;
    weatherImg.src = '404.png'
    windSpeed.innerHTML = '0' 
    humdity.innerHTML = '0'

    inputBox.addEventListener('click', function(){
        inputBox.value=''
    })
  
    
   }
   else{
        errorMsg.style.display='none'

   }


//  temperature

    try {
   
    temperature.innerHTML = Math.round(response.main.temp - 273.15) +  '<sup>°C</sup>';
        
    } catch (error) {
        throw new Error(" not found");
        
    }

    


    // wind speed
    windSpeed.innerHTML = response.wind.speed + 'Km/H'


    //humidity

    humdity.innerHTML = response.main.humidity + '%'


    // discription
    let dis = response.weather[0].description
   
   discription.innerHTML = response.weather[0].description


   images = response.weather[0].main

   switch (images) {
    case 'Clouds':
        weatherImg.src = 'Images/cloud.png'
        break;
    case 'Clear':
        weatherImg.src = 'Images/clear.png'
        break;
   
    case 'Rain':
        weatherImg.src = 'Images/rain.png'
        break;
   
    case 'Mist':
        weatherImg.src = 'Images/mist.png'
        break;
   
    case 'Snow':
        weatherImg.src = 'Images/snow.png'
        break;
   
        
   }

   


    

}












searchBtn.addEventListener('click', function(){
     weatherBody.style.display='flex'
     checkWeather(inputBox.value);
    
})
