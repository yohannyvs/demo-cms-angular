import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ruta } from '../ruta_global';

@Injectable()

export class ServicioUsuarios{

	public url: string;

	constructor(private _http: Http) {

		this.url = Ruta.url + '/login';
	
	}

	login( listaUsuarios, token ){

		listaUsuarios.token = token;

		const parametros = JSON.stringify(listaUsuarios);

		const headers = new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url, parametros, {headers: headers}).pipe(map(resultado => resultado.json()));
	}
}