import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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

	// deleta um registro
	deleteWeather(weather: Weather) {
		this.weatherService.deleteWeather(weather).subscribe(() => {
		  this.getWeathers();
		});
	}

	salvarWeather(form: NgForm) {
		console.log('aqui')
		if (this.weather.id !== undefined) {
			this.weatherService.updateWeather(this.weather).subscribe(() => {
			  this.cleanForm(form);
			});
		} else {
			this.weatherService.saveWeather(this.weather).subscribe(() => {
			  this.cleanForm(form);
			});
		}
	}

	// copia o registro para ser editado.
	editWeather(weather: Weather) {
		this.weather = { ...weather };
	}

	cleanForm(form: NgForm) {
		this.getWeathers();
		form.resetForm();
		this.weather = {} as Weather;
	  }
}
