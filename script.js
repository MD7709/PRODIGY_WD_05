document.getElementById('search-btn').addEventListener('click' , function() {
    const city = document.getElementById('city-input').value;
    if(city)
        {
            feathweather(city);
        }
})


async function feathweather(city) {
    const apikey = 'bd5e378503939ddaee76f12ad7a97608';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

    try
    {
        const response = await fetch(url);
        if(!response) {
            const errorDetails = await response.text();
            throw new Error(`Network Response was not ok : ${response.status} - ${errorDetails}`)
        }
        const result  = await response.json();
        updateWeatherInfo(result)
    }
    catch (error)
    {
        console.log("Fetch Error :", error)
    }
}


function updateWeatherInfo(data) {

    if(!data || !data.main || !data.weather)
        {
            console.log("Invalid Data Fetch : " ,data);
            return;
        }

    document.querySelector('.city-name').textContent = data.name;
    document.querySelector('.temperature').textContent = `${data.main.temp}°C`;
    document.querySelector('.description').textContent = data.weather[0].description;
    document.querySelector('.humidity').textContent = `humidity : ${data.main.humidity}%`;
    document.querySelector('.wind-speed').textContent = `wind spped : ${data.wind.speed} m/s`;

}
