import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AdminRouteGuard implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):boolean | UrlTree {
      const router = inject(Router);

      

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('roles');

  if (token && role === 'admin') {
    console.log("is valid");

    return true;
  }

  router.navigate(['/login']);
  return false;

}
}
