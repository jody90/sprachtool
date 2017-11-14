import { KeyEditComponent } from './key-edit/key-edit.component';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

export class KeyEditGuard implements CanDeactivate<KeyEditComponent> {
    canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
        return component.canDeactivate();
    }
}