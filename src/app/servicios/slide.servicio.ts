 import { Injectable } from '@angular/core';
 import { Http, Response, Headers } from '@angular/http';
 import { map } from 'rxjs/operators';
 import { Observable } from 'rxjs';
 import { Ruta } from '../ruta_global';

 @Injectable()

 export class ServicioSlide{

 	public url:string;

 	constructor(private _http:Http)
 	{
 		this.url =  Ruta.url;
 	}

 	//Seleccionar y mostrar Slide
 	tomarJsonSlide()
 	{
 		let url = this.url + "/mostrar-slides";
 		return this._http.get( url ).pipe(map(resultado => resultado.json()));
 	}

 	//Nueva imagen de Slide
 	subirImagenSlide( url, items, token, imagen )
 	{
 		if(!imagen)
 		{
 			return new Promise( function( resolver, rechazar ){
 				rechazar("No hay imagen para subir");
 			});
 		}else{
 			return new Promise( function( resolver, rechazar ){
 				var formData:any = new FormData();
 				var xhr = new XMLHttpRequest();

 				formData.append( "imagen", imagen[0] );
 				formData.append( "titulo", items.titulo );
 				formData.append( "descripcion", items.descripcion );

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

 	actualizarItemSlide( url, items, token, imagen )
 	{
 		if(!imagen)
 		{
 			return new Promise( function( resolver, rechazar ){
 				var formData:any = new FormData();
 				var xhr = new XMLHttpRequest();

 				formData.append("titulo", items.titulo);
		        formData.append("descripcion", items.descripcion);
		        formData.append("actualizarImagen", 0);
		        formData.append("rutaImagenActual", items.imagen);

 				xhr.onreadystatechange = function(){

 					if( xhr.readyState === 4 )
	 				{
	 					if( xhr.status === 200 )
	 					{
		 					resolver( JSON.parse( xhr.response ) );
		 				}else{
		 					rechazar( xhr.response );
		 				}
	 				}
 				}

 				xhr.open( "PUT", url, true );
	 			xhr.setRequestHeader( "Authorization", token );
	 			xhr.send( formData );
 			});
 		}else{
 			return new Promise( function( resolver, rechazar ){
 				var formData:any = new FormData();
 				var xhr = new XMLHttpRequest();

	           	formData.append("imagen", imagen[0]);
	           	formData.append("titulo", items.titulo);
	           	formData.append("descripcion", items.descripcion);
	           	formData.append("actualizarImagen", 1);
	           	formData.append("rutaImagenActual", items.imagen);

 				xhr.onreadystatechange = function(){

 					if( xhr.readyState === 4 )
	 				{
	 					if( xhr.status === 200 )
	 					{
		 					resolver( JSON.parse( xhr.response ) );
		 				}else{
		 					rechazar( xhr.response );
		 				}
	 				}
 				}

 				xhr.open( "PUT", url, true );
	 			xhr.setRequestHeader( "Authorization", token );
	 			xhr.send( formData );

 			});
 		}
 	}

 	borrarItemSlide( id, token )
 	{
 		let url = this.url + "/borrar-slide/" + id;

 		let headers = new Headers({ "Content-Type":"application/json", "Authorization": token });

 		return this._http.delete( url, { headers: headers } ).pipe(map( resultado => resultado.json()) );
 	}
 }
