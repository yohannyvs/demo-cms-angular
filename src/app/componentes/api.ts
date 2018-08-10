import { Component, OnInit } from '@angular/core';

//Modelos
import { ListaUsuarios } from '../modelo/usuarios.modelo';
import { ItemSlides } from '../modelo/slides.modelo';
import { ItemGalerias } from '../modelo/gelerias.modelo';

//Servicios
import { ServicioUsuarios } from '../servicios/usuarios.servicio';
import { ServicioSlide } from '../servicios/slide.servicio';
import { ServicioGaleria } from '../servicios/galeria.servicio';

//Ruta global
import { Ruta } from '../ruta_global';

@Component({

	selector: "tag-api",
	templateUrl: "../vistas/api.html",
	providers: [ ServicioUsuarios, ServicioSlide, ServicioGaleria ]

})

export class ApiComponente{

	public identificado;
	public listaUsuarios:ListaUsuarios;
	public itemSlides:ItemSlides;
	public itemGalerias:ItemGalerias;
	public validarIngreso:boolean = false;
	public usuario;
	public mensaje;
	public subirImagen:Array<File>;
	public url:string;

	constructor( private _servicioUsuarios:ServicioUsuarios, private _servicioSlide:ServicioSlide, private _servicioGaleria:ServicioGaleria )
	{
		this.listaUsuarios = new ListaUsuarios("","");
		this.itemSlides = new ItemSlides("","","");
	}

	ngOnInit()
	{
		this.identificado = localStorage.getItem("id");
		this.usuario = localStorage.getItem("usuario");
	}

	onSubmit()
	{
		this._servicioUsuarios.login( this.listaUsuarios, "true" ).subscribe(
			resultado => {

				console.log("resultado", resultado);

				this.identificado = resultado.token;
				this.usuario = resultado.usuario;

				localStorage.setItem( "id", this.identificado );
				localStorage.setItem( "usuario", this.usuario );
			
			},
			error => {
				this.validarIngreso = true;

				var errrorMensaje = JSON.parse( error._body );
				
				this.mensaje = errrorMensaje.mensaje;
			});
	}

	cerrarSesion()
	{
		localStorage.removeItem("id");
		localStorage.removeItem("usuario");
		localStorage.clear();
		this.identificado = null;
		this.usuario = null;

	}

	cargarFichero( fileInput:any )
	{
		this.subirImagen = <Array<File>>fileInput.target.files;
		console.log("this.subirImagen", this.subirImagen);

		if( this.subirImagen[0].size < 2000000 &&
			this.subirImagen[0].type === "image/jpeg" ||
			this.subirImagen[0].type === "image/png")
		{
			this.validarIngreso = false;
			return this.subirImagen;
		}else{
			this.validarIngreso = true;
			this.mensaje = "La extención o el peso del archivo no es valido";
			this.subirImagen = null;
			return this.subirImagen;
		}
	}

	nuevoSlide()
	{
		this.url = Ruta.url + "/crear-slide";
		this._servicioSlide.subirImagenSlide( this.url, this.itemSlides, this.identificado, this.subirImagen ).then(

			(resultado)=>{
				window.location.reload();
			},
			(error)=>{
				this.validarIngreso = true;
				this.mensaje = "No se pudo subir el Slide";
			}

			);
	}

	nuevaFotoGaleria()
	{
		this.url = Ruta.url + "/crear-foto";
		this._servicioGaleria.subirFotoGaelria( this.url, this.identificado, this.subirImagen ).then(

			(resultado)=>{
				window.location.reload();
			},
			(error)=>{
				this.validarIngreso = true;
				this.mensaje = "No se pudo subir la foto";
			}

			);
	}
}