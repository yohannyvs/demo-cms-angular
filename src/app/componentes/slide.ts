import { Component, OnInit } from '@angular/core';

//Modelos
import { ItemSlides } from '../modelo/slides.modelo';

//Servicios
import { ServicioSlide } from '../servicios/slide.servicio';

//Ruta general
import { Ruta } from '../ruta_global';

@Component({

	selector: "tag-slide",
	templateUrl: "../vistas/slide.html",
	providers: [ServicioSlide]

})

export class SlideComponente{

	public slideJson;
	public identificado;
	public url:string;
	public subirImagen:Array<File>;
	public validarIngreso:boolean = false;
	public mensaje;
	public itemSlides:ItemSlides;
	public idSlide;
	public formEditarSlide:boolean = false;
	public cambiarImagen:boolean = false;

	constructor(private _ServicioSlide:ServicioSlide)
	{
		this._ServicioSlide.tomarJsonSlide().subscribe(
			resultado => { 
				this.slideJson = resultado.mostrandoSlides;
				this.url = Ruta.url;
		 	},
		 	error => {
		 		var mensajeError = <any>error;
		 	});
	}

	ngOnInit()
	{
		this.identificado = localStorage.getItem("id");

		setTimeout(()=>
		{
			var p = {
				paginacion: document.querySelectorAll("#paginacion li"),
				item: 0,
				cajaSlide: document.querySelectorAll("#slide ul"),
				animacionSilde: "slide",
				imgSlide: document.querySelectorAll("#slide ul li"),
				avanzar: document.querySelector("#slide #avanzar"),
				retroceder: document.querySelector("#slide #retroceder"),
				velocidadSlide: 3000,
				formatearLoop: false
			}
			var m = {
				inicioSlide: function() {
					for (var i = 0; i < p.paginacion.length; i++) {
						p.paginacion[i].addEventListener("click", m.paginacionSlide);
						p.imgSlide[""+i].style.width = (100 / p.paginacion.length) + "%";
					}
					p.avanzar.addEventListener("click", m.avanzar);
					p.retroceder.addEventListener("click", m.retroceder);
					m.intervalo();
					p.cajaSlide["0"].style.width = (p.paginacion.length * 100) + "%";
				},
				paginacionSlide: function(item) {
					p.item = item.target.parentNode.getAttribute("value") - 1;
					m.movimientoSlide(p.item);
				},
				avanzar: function() {
					if (p.item == p.imgSlide.length - 1) {
						p.item = 0;
					} else {
						p.item++;
					}
					m.movimientoSlide(p.item);
				},
				retroceder: function() {
					if (p.item == 0) {
						p.item = p.imgSlide.length - 1;
					} else {
						p.item--;
					}
					m.movimientoSlide(p.item);
				},
				movimientoSlide: function(item) {
					p.formatearLoop = true;
					p.cajaSlide["0"].style.left = item * -100 + "%";
					for (var i = 0; i < p.paginacion.length; i++) {
						p.paginacion[""+i].style.opacity = .5;
					}
					p.paginacion[""+item].style.opacity = 1;
					if (p.animacionSilde == "slide") {
						p.cajaSlide["0"].style.transition = ".7s left ease-in-out";
					}
					if (p.animacionSilde == "fade") {
						p.imgSlide[""+item].style.opacity = 0;
						p.imgSlide[""+item].style.transition = ".7s opacity ease-in-out";
						setTimeout(function() {
							p.imgSlide[""+item].style.opacity = 1;
						}, 10)
					}
				},
				intervalo: function() {
					setInterval(function() {
						if (p.formatearLoop) {
							p.formatearLoop = false;
						} else {
							m.avanzar();
						}
					}, p.velocidadSlide)
				}
			}
			m.inicioSlide();
		},2500);
	}

	cargarFichero( fileInput:any )
	{
		this.subirImagen = <Array<File>>fileInput.target.files;
		console.log("this.subirImagen", this.subirImagen);

		if( this.subirImagen[0].size < 2000000 &&
			this.subirImagen[0].type == "image/jpeg" ||
			this.subirImagen[0].type == "image/png")
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

	//editar Slide
	editarSlide( slide )
	{
		this.idSlide = slide._id;
		this.itemSlides = new ItemSlides( slide.imagen, slide.titulo, slide.descripcion );

		this.formEditarSlide = true;
	}

	actualizarSlide()
	{
		let url = Ruta.url + "/actualizar-slide/"+ this.idSlide;

		this._ServicioSlide.actualizarItemSlide( url, this.itemSlides, this.identificado, this.subirImagen ).then(
			(resultado)=>{
				window.location.reload();
			},
			(error)=>{
				console.log("error", error)
			}

		);
	}

	borrarSlide(slide)
	{
		let id = slide._id;
		this._ServicioSlide.borrarItemSlide(id, this.identificado ).subscribe(
			resultado => {
				window.location.reload();
			}, 
			error => {
				console.log("error", error);
			}
		);
	}
}