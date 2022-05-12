$(document).ready(function() {
	const app = document.querySelector('.weather-app');
const dateOutput = document.querySelector('.date');
const date2Output = document.querySelector('.date2');
const date3Output = document.querySelector('.date3');
const timeOutput = document.querySelector('.time');
const time2Output = document.querySelector('.time2');
const time3Output = document.querySelector('.time3');
const nameOutput = document.querySelector('.name');

const conditionOutput = document.querySelector('.condition');
const condition2Output = document.querySelector('.condition2');
const condition3Output = document.querySelector('.condition3');

const cloud2Output = document.querySelector('.cloud2');
const humidity2Output = document.querySelector('.humidity2');
const wind2Output = document.querySelector('.speed2');
const pressure2Output = document.querySelector('.pressure2');
const temperature2Output = document.querySelector('.temperature2');

const cloud3Output = document.querySelector('.cloud3');
const humidity3Output = document.querySelector('.humidity3');
const wind3Output = document.querySelector('.speed3');
const pressure3Output = document.querySelector('.pressure3');
const temperature3Output = document.querySelector('.temperature3');

const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.speed');
const pressureOutput = document.querySelector('.pressure');
const temperatureOutput = document.querySelector('.temperature');
const form = document.querySelector('.locationInput');
const threedays = document.getElementById('3days');
const oneday = document.getElementById('1day');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const secondpanel = document.getElementById("panel2");
const thirdpanel = document.getElementById("panel3");
const text2Output = document.querySelector("text2");
const text3Output = document.querySelector("text3");

let cityInput = "London";

cities.forEach((city) => {
	if(city){
		city.addEventListener('click', (e) => {
		cityInput = e.target.innerHTML;
		fetchWeatherData();
		app.style.opacity = "0";
	});
	}
	
})

threedays.addEventListener("click", (e) => {
	if (secondpanel.style.visibility !== 'visible') {
        secondpanel.style.visibility = 'visible';
    }
    if (thirdpanel.style.visibility !== 'visible') {
        thirdpanel.style.visibility = 'visible';
    }
});

oneday.addEventListener("click", (e) => {
	if (secondpanel.style.visibility !== 'hidden') {
        secondpanel.style.visibility = 'hidden';
    }
    if (thirdpanel.style.visibility !== 'hidden') {
        thirdpanel.style.visibility = 'hidden';
    }
});


form.addEventListener('submit', (e) => {
	if(search.value.length == 0) {
		alert('Please, enter a city');
	} else{
		cityInput = search.value;

		fetchWeatherData();

		search.value = "";

		app.style.opacity = "0";
	}
	e.preventDefault();
});






function dayOfTheWeek(day, month, year) {
	const  weekday = [
	"Friday",
	"Thursday",
	"Saturday",
	"Tuesday",
	"Monday",
	"Sunday",
	"Wednesday"
	];
	return weekday[new Date(`${day}/${month}/${year}`).getDay()];

};

function fetchWeatherData() {
	fetch(`http://api.weatherapi.com/v1/forecast.json?key=2bb63d3618454f04a2e134217220805&q=${cityInput}&days=3`)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		conditionOutput.innerHTML = data.current.condition.text;
		condition2Output.innerHTML = data.forecast.forecastday[1].day.condition.text;
		condition3Output.innerHTML = data.forecast.forecastday[2].day.condition.text;
		// conditionOutput.innerHTML = data.forecast.forecastday[0].day.condition.text;

		const date = data.location.localtime;
		const y = parseInt(date.substr(0, 4));
		const m = parseInt(date.substr(5, 2));
		const d = parseInt(date.substr(8, 2));
		const d2 = d+1;
		const d3 = d+2;
		const time =date.substr(11);

		dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
		timeOutput.innerHTML = time;
		time2Output.innerHTML = time;
		time3Output.innerHTML = time;
		date2Output.innerHTML = `${d2}, ${m}, ${y}`;
		date3Output.innerHTML = `${d3}, ${m}, ${y}`;
		nameOutput.innerHTML = data.location.name;

		windOutput.innerHTML = data.current.wind_kph + "km/h";
		cloudOutput.innerHTML = data.current.cloud + "%";
		humidityOutput.innerHTML = data.current.humidity + "%";
		pressureOutput.innerHTML = data.current.pressure_in + "";
		temperatureOutput.innerHTML = data.current.feelslike_c + "℃";

		wind2Output.innerHTML = data.forecast.forecastday[1].day.maxwind_kph + "km/h";
		cloud2Output.innerHTML = data.forecast.forecastday[1].hour[14].cloud + "%";
		humidity2Output.innerHTML = data.forecast.forecastday[1].day.avghumidity + "%";
		pressure2Output.innerHTML = data.forecast.forecastday[1].hour[14].pressure_in + "";
		temperature2Output.innerHTML = data.forecast.forecastday[1].day.avgtemp_c + "℃";

		wind3Output.innerHTML = data.forecast.forecastday[2].day.maxwind_kph + "km/h";
		cloud3Output.innerHTML = data.forecast.forecastday[2].hour[14].cloud + "%";
		humidity3Output.innerHTML = data.forecast.forecastday[2].day.avghumidity + "%";
		pressure3Output.innerHTML = data.forecast.forecastday[2].hour[14].pressure_in + "";
		temperature3Output.innerHTML = data.forecast.forecastday[2].day.avgtemp_c + "℃";

		let timeOfDay = "day";

		const code = data.current.condition.code;

		if(!data.current.is_day)
		{
			timeOfDay = "night";
		}



		app.style.opacity = "1";
	})
	.catch(() => {
		alert('City not found!');
		app.style.opacity = "1";
	});
}


fetchWeatherData();

app.style.opacity = "1";
});