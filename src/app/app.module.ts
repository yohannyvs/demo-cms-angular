import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

//Componentes Pagina
import { IndexComponente } from './componentes/index';
import { CabezoteComponente } from './componentes/cabezote';
import { SlideComponente } from './componentes/slide';
import { GaleriaComponente } from './componentes/galeria';
import { MouseComponente } from './componentes/mouse';
import { ScrollComponente } from './componentes/scroll';
import { FormularioComponente } from './componentes/formulario';
import { ApiComponente } from './componentes/api';

//Rutas
import { routing, appRoutingProviders } from './app.rutas';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponente,
    CabezoteComponente,
    SlideComponente,
    GaleriaComponente,
    MouseComponente,
    ScrollComponente,
    FormularioComponente,
    ApiComponente
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
