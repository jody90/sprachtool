import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

export class KeyDeleteGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return confirm("Do you really want to delete this Key. Please tell me what you want!");
    }
}