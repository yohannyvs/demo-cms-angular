import { Component, OnInit } from '@angular/core';

@Component({

	selector: "tag-formulario",
	templateUrl: "../vistas/formulario.html"

})

export class FormularioComponente{

	ngOnInit()
	{
		setTimeout(()=>
			{
				var pf = {
					entradas: document.querySelectorAll("input.validar"),
					valor: null,
					expresionRegular: null,
					validarUsuario: false,
					validarPassword: false,
					validarEmail: false,
					validarTerminos: null
				}
				var mf = {
					inicioFormulario: function() {
						for (var i = 0; i < pf.entradas.length; i++) {
							pf.entradas[i].addEventListener("focus", mf.enFoco);
							pf.entradas[i].addEventListener("blur", mf.fueraFoco);
							pf.entradas[i].addEventListener("change", mf.cambioEntrada);
						}
					},
					enFoco: function(input) {
						pf.valor = input.target.value;
						if (pf.valor == "") {
							document.querySelectorAll("#" + input.target.id)["0"].style.background = "rgba(255,255,0,.5)";
							document.querySelectorAll("[for=" + input.target.id + "] .obligatorio")["0"].style.opacity = 1;
						}
						document.querySelector("[for=" + input.target.id + "]").appendChild(document.createElement("DIV")).setAttribute("class", "error")
					},
					fueraFoco: function(input) {
						document.querySelectorAll("#" + input.target.id)["0"].style.background = "white";
						document.querySelectorAll("[for=" + input.target.id + "] .obligatorio")["0"].style.opacity = 0;
					},
					cambioEntrada: function(input) {
						pf.valor = input.target.value;
						if (pf.valor != "") {
							switch (input.target.id) {
								case "nombre":
									if (pf.valor.length < 2 || pf.valor.length > 6) {
										document.querySelector("[for=" + input.target.id + "] .error").innerHTML = '<span style="color:red">*Error al ingresar los datos: ' + input.target.placeholder + '</span>';
										pf.validarUsuario = false;
									} else {
										document.querySelector("[for=" + input.target.id + "] .error").parentNode.removeChild(document.querySelector("[for=" + input.target.id + "] .error"))
										pf.validarUsuario = true;
									}
									break;
								case "password":
									pf.expresionRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
									if (!pf.expresionRegular.test(pf.valor)) {
										document.querySelector("[for=" + input.target.id + "] .error").innerHTML = '<span style="color:red">*Error al ingresar los datos: ' + input.target.placeholder + '</span>';
										pf.validarPassword = false;
									} else {
										document.querySelector("[for=" + input.target.id + "] .error").parentNode.removeChild(document.querySelector("[for=" + input.target.id + "] .error"))
										pf.validarPassword = true;
									}
									break;
								case "email":
									pf.expresionRegular = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
									if (!pf.expresionRegular.test(pf.valor)) {
										document.querySelector("[for=" + input.target.id + "] .error").innerHTML = '<span style="color:red">*Error al ingresar los datos: ' + input.target.placeholder + '</span>';
										pf.validarEmail = false;
									} else {
										document.querySelector("[for=" + input.target.id + "] .error").parentNode.removeChild(document.querySelector("[for=" + input.target.id + "] .error"))
										pf.validarEmail = true;
									}
									break;
							}
						} else {
							document.querySelector("[for=" + input.target.id + "] .error").parentNode.removeChild(document.querySelector("[for=" + input.target.id + "] .error"))
						}
					},
					validarFormulario: function() {
						pf.validarTerminos = document.querySelectorAll("#terminos")["0"].checked;
						if (!pf.validarUsuario || !pf.validarPassword || !pf.validarEmail) {
							document.querySelector("#labelEnviar").innerHTML = '<span style="color:red">¡*Tiene errores en los datos que ha ingresado, favor revisar de nuevo!</span>';
							return false;
						} else if (!pf.validarTerminos) {
							document.querySelector("#labelEnviar").innerHTML = '<span style="color:red">¡*Favor acepte términos y condiciones!</span>';
							return false;
						} else {
							return true;
						}
					}
				}
				mf.inicioFormulario();
			},2500)
	}
}