import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponente } from './componentes/index';
import { ApiComponente } from './componentes/api';


const appRoutes: Routes = [
	{ path: "", component: IndexComponente },
	{ path: "index", component: IndexComponente },
	{ path: "api", component: ApiComponente },
	{ path: "**", component: IndexComponente }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);