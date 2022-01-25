let weather = {
    key: '5b5e14c4d1cc361662fb3e08aaa991c7',
    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.key}`)
        .then(res => {
            if(!res.ok) {
                throw Error('Sorry Could Not Find ' + city);
            }
            return res.json();
        })
        .then(data => this.displayWeather(data))
        .catch(err => renderError(err))
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind
        document.querySelector('.city').innerText = `weather in ${name}`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector('.weather-type').innerText = description;
        document.querySelector('.temperature').innerText = `${temp}°C`;
        document.querySelector('.humid').innerText = `${humidity}%`;
        document.querySelector('.wind').innerText = `${speed}km/h`;
        document.querySelector('.weather-content').classList.remove('loading');
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
    searchWeather: function () {
        this.fetchWeather(input.value.trim());
    },
};
const searchBtn = document.querySelector('i');
const input = document.querySelector('#search');
const searchInput = input.value.trim();
const weatherError = document.querySelector('.weather-error');

function renderError(searchInput) {
    document.querySelector('.error').innerText = `${searchInput}`;
}
searchBtn.addEventListener('click', () => {
    if(input.value === '') {
        document.querySelector('.error').innerText = `Please enter a location`;
    } else {
        weather.searchWeather();
        document.querySelector('.error').innerText = '';
        document.querySelector('.intro').innerText = '';
        input.value = " ";
    }
});
input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        weather.searchWeather();
        input.value = " ";
        document.querySelector('.intro').innerText = '';
        document.querySelector('.error').innerText = '';
    }
});