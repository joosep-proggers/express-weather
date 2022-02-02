const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = '4e6fb3b33d4a7a69591cca21c7882ee9'
let city = 'Tartu'

app.get('/', function(req, res){
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
	.then((response)=>{
		return response.json()
	})
	.then((data) => {
		let description = data.weather[0].description;
		let temp = Math.round(parseFloat(data.main.temp)-273.15);
		let feelsLike = Math.round(parseFloat(data.main.feels_like)-273.15);
		let tempMin = Math.round(parseFloat(data.main.temp_min)-273.15);
		let tempMax = Math.round(parseFloat(data.main.temp_max)-273.15);
		let wind = data.wind.speed;
		res.render('default.ejs',{
			description: description,
			city: city,
			tempMax: tempMax,
			tempMin: tempMin,
			temp: temp,
			feelsLike: feelsLike,
			wind: wind
		})
	})
});

app.listen(6969);