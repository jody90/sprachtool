import { KeyEditGuard } from './key-edit.guard';
import { KeyDeleteGuard } from './key-delete.guard';
import { KeyEditComponent } from './key-edit/key-edit.component';
import { KeyDeleteComponent } from './key-delete.component';
import { Routes } from '@angular/router';

export const KEY_ROUTES: Routes = [
    {
        path: 'new',
        component: KeyEditComponent,
        canDeactivate: [KeyEditGuard]        
    },
    {
        path: 'edit',
        redirectTo: '',
        canDeactivate: [KeyEditGuard]
    },
    {
        path: 'edit/:id',
        component: KeyEditComponent,
        canDeactivate: [KeyEditGuard]        
    },
    {
        path: 'delete/:id',
        component: KeyDeleteComponent,
        canActivate: [KeyDeleteGuard]
    }
]
