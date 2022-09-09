import { Component } from '@angular/core';
import { Weather } from './models/weather';
import { WeatherService } from './services/weather.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'front';

	weather = {} as Weather;
	weathers = {} as Weather[];

	constructor(private weatherService: WeatherService) {}

	ngOnInit() {
		this.getWeathers();
	}

	getWeather() {
		this.weatherService.getWeather().subscribe((weather: Weather) => {
		  this.weather = weather;
		});
	}

	getWeathers() {
		this.weatherService.getWeathers().subscribe((weathers: Weather[]) => {
		  this.weathers = weathers;
		});
	}

	adicionarRegistroAleatorio() {
		this.weatherService.adicionarRegistroAleatorio().subscribe((weather: Weather) => {
		  this.weather = weather;
		});
		this.getWeathers();
	}
}
