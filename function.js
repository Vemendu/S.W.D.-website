// window.onscroll = function() {myFunction()};
// var header = document.getElementById("myHeader");
// var sticky = header.offsetTop;
// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const date2Output = document.querySelector('.date2');
const date3Output = document.querySelector('.date3');
const time3Output = document.querySelector('.time3');
const time2Output = document.querySelector('.time2');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "London";

cities.forEach((city) => {
	city.addEventListener('click', (e) => {
		cityInput = e.target.innerHTML;
		fetchWeatherData();
		app.style.opacity = "0";
	});
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
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
	];
	return weekday[new Date(`${day}/${month}/${year}`).getDay()];

};

function fetchWeatherData() {
	fetch(`http//api.weatherapi.com/v1/currently.json?key=2bb63d3618454f04a2e134217220805=${cityInput}`)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		temp.innerHTML = data.current.condition.text;

		const date = data.location.localtime;
		const y = parseInt(date.substr(0, 4));
		const m = parseInt(date.substr(5, 2));
		const d = parseInt(date.substr(8, 2));
		const time =date.substr(11);

		dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
		timeOutput.innerHTML = time;
		nameOutput.innerHTML = data.location.name;


		cloudOutput.innerHTML = data.current.cloud + "%";
		humidityOutput.innerHTML = data.current.humidity + "%";
		windOutput.innerHTML = data.current.wind + "km/h";

		let timeOfDay = "day";

		const code = data.current.condition.code;

		if(!data.current.is_day)
		{
			timeOfDay = "night";
		}

		app.style.opacity = "1";
	});
	.catch(() => {
		alert('City not found!');
		app.style.opacity = "1";
	});
}

fetchWeatherData();

app.style.opacity = "1";


