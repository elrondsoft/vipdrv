import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SitesComponent } from './sites.component';
import { SiteDetailsComponent } from './details/siteDetails.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: SitesComponent,
        children: []
    },
    {
        path: ':entityId',
        component: SiteDetailsComponent,
        children: []
    },
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);