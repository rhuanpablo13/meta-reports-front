import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Weather } from '../models/weather';


@Injectable({
	providedIn: 'root'
})

export class WeatherService {

	URL = 'http://localhost:8080/api'


	constructor(private httpClient: HttpClient) { }

	// Headers
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	}

	// Obtem todos os dados da api externa
	getWeathers(): Observable<Weather[]> {
		return this.httpClient.get<Weather[]>(this.URL + '/forecast/local')
			.pipe(
			retry(2),
			catchError(this.handleError))
	}

	// Obtem todos os dados da api externa
	getWeather(): Observable<Weather> {
		return this.httpClient.get<Weather>(this.URL + '/forecast/api-externa/listar')
			.pipe(
			retry(2),
			catchError(this.handleError))
	}

	// Obtem todos os dados da api externa
	adicionarRegistroAleatorio(): Observable<Weather> {
		return this.httpClient.get<Weather>(this.URL + '/forecast/api-externa/salvar')
			.pipe(
			retry(2),
			catchError(this.handleError))
	}

	// deleta um carro
	deleteWeather(weather: Weather) {
		return this.httpClient.delete<Weather>(this.URL + '/forecast/local/' + weather.id, this.httpOptions)
		  .pipe(
			retry(1),
			catchError(this.handleError)
		  )
	}

	// salva um carro
	saveWeather(weather: Weather): Observable<Weather> {
		return this.httpClient.post<Weather>(this.URL + '/forecast', JSON.stringify(weather), this.httpOptions)
		  .pipe(
			retry(2),
			catchError(this.handleError)
		)
	}


	updateWeather(weather: Weather): Observable<Weather> {
		return this.httpClient.put<Weather>(this.URL + '/forecast', JSON.stringify(weather), this.httpOptions)
		  .pipe(
			retry(2),
			catchError(this.handleError)
		)
	}

	// Manipulação de erros
	handleError(error: HttpErrorResponse) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
		  // Erro ocorreu no lado do client
		  errorMessage = error.error.message;
		} else {
		  // Erro ocorreu no lado do servidor
		  errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	};
}
