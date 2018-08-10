 import { Injectable } from '@angular/core';
 import { Http, Response, Headers } from '@angular/http';
 import { map } from 'rxjs/operators';
 import { Observable } from 'rxjs';
  import { Ruta } from '../ruta_global';

 @Injectable()

 export class ServicioGaleria{

 	public url:string;

 	constructor(private _http:Http)
 	{
 		this.url = Ruta.url;
 	}

 	tomarJsonGaleria()
 	{
 		let url = this.url + "/mostrar-fotos";
 		return this._http.get( url ).pipe(map(resultado => resultado.json()));
 	}

 	//Nueva imagen de Galeria
 	subirFotoGaelria( url, token, foto )
 	{
 		if(!foto)
 		{
 			return new Promise( function( resolver, rechazar ){
 				rechazar("No hay imagen para subir");
 			});
 		}else{
 			return new Promise( function( resolver, rechazar ){
 				var formData:any = new FormData();
 				var xhr = new XMLHttpRequest();

 				formData.append( "foto", foto[0] );
 				

 				xhr.onreadystatechange = function(){

 					if( xhr.readyState == 4 )
	 				{
	 					if( xhr.status == 200 )
	 					{
		 					resolver( JSON.parse( xhr.response ) );
		 				}else{
		 					rechazar( xhr.response );
		 				}
	 				}
 				}

 				xhr.open( "POST", url, true );
	 			xhr.setRequestHeader( "Authorization", token );
	 			xhr.send( formData );

 			});
 		}
 	}

 	borrarItemGaleria( id, token )
 	{
 		let url = this.url + "/borrar-foto/" + id;

 		let headers = new Headers({ "Content-Type":"application/json", "Authorization": token });

 		return this._http.delete( url, { headers: headers } ).pipe(map( resultado => resultado.json()) );
 	}
 }
