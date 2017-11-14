import { AdminComponent } from './admin/admin.component';
import { KEY_ROUTES } from './key/key.routes';
import { VERSION_ROUTES } from './versions/version.routes';
import { VersionsComponent } from './versions/versions.component';
import { KeyComponent } from './key/key.component';
import { RouterModule, Routes } from '@angular/router';


const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/translations',
        pathMatch: 'full'
    },
    {
        path: 'translations',
        component: KeyComponent,
        children: KEY_ROUTES
    },
    {
        path: 'versions',
        component: VersionsComponent,
        children: VERSION_ROUTES
    },
    {
        path: 'admin',
        component: AdminComponent
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES)