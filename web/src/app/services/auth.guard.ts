import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';

import { Service } from './service.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: Service, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.checkAcess();
  }
  private checkAcess() {
    if (this.service.signed) {
      // this.router.navigate(['/home']);
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  // canLoad(route: Route): Observable<boolean> | boolean {
  //   return this.checkAcess();
  // }
}
