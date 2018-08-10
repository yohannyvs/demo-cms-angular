import { Component, OnInit } from '@angular/core';

@Component({

	selector: "tag-mouse",
	templateUrl: "../vistas/mouse.html"

})

export class MouseComponente{

	ngOnInit()
	{
		setTimeout(()=>
		{
			var pm = {
				zona: document.querySelectorAll("#efectoMouse"),
				figuras: document.querySelectorAll("#efectoMouse figure"),
				mouseX: 0,
				mouseY: 0,
				horizontal: true,
				vertical: false
			}
			var mm = 
			{
				inicioMouse: function() {
					pm.zona["0"].addEventListener("mousemove", mm.movimientoMouse);
					for (var i = 0; i < pm.figuras.length; i++) {
						pm.figuras[""+i].innerHTML = '<img src="assets/img/mouse/plano0' + i + '.png">';
						pm.figuras[""+i].style.zIndex = -i;
					}
					setTimeout(function() {
						pm.zona["0"].style.height = pm.figuras[0].childNodes["0"].height + "px";
					}, 100)
				},
				movimientoMouse: function(mouse) {
					pm.mouseX = mouse.offsetX;
					pm.mouseY = mouse.offsetY;
					for (var i = 0; i < pm.figuras.length; i++) {
						if (pm.horizontal) {
							pm.figuras[""+i].style.left = -pm.mouseX / (i * 100 + 50) + "%";
						}
						if (pm.vertical) {
							pm.figuras[""+i].style.top = pm.mouseY / (i * 100 + 50) + "%";
						}
					}
				}
			}
			mm.inicioMouse();
		},2500);
	}

}