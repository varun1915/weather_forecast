const form = document.querySelector('form');
const btn = document.querySelector('.search');
const text = document.querySelector('.address');

const text1 = document.querySelector('#text1');
const text2 = document.querySelector('#text2');
const text3 = document.querySelector('#text3');
const text4 = document.querySelector('#text4');
const text5 = document.querySelector('#text5');
const text6 = document.querySelector('#text6');
const text7 = document.querySelector('#text7');

btn.addEventListener( 'click', (event) => {
    event.preventDefault();
    const address = text.value;

    text1.textContent = 'Loading...'

    fetch("http://localhost:3000/weather?address=" + encodeURIComponent(address))
    .then(data => data.json())
    .then( (data) => {
        if(!!data.error){
            text1.textContent = data.error
        }else{
            text1.innerHTML = "<strong>Location:</strong> " + data.location;
            text2.innerHTML = "<strong>Humidity:</strong> " + data.forecast.humidity;
            text3.innerHTML = "<strong>Rain:</strong> " + data.forecast.rain;
            text4.innerHTML = "<strong>Temperature:</strong> " + data.forecast.temperature;
            text5.innerHTML = "<strong>Visibility:</strong> " + data.forecast.visibility;
            text6.innerHTML = "<strong>Weather Outside:</strong> " + data.forecast.weather;
            text7.innerHTML = "<strong>Wind Speed:</strong> " + data.forecast.windSpeed;
            console.log(data);
        }
    });
})






