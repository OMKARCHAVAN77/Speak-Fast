import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AdminRouteGuard implements CanActivate{
   constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):boolean | UrlTree {




  const token = localStorage.getItem('token');
  const role = localStorage.getItem('roles');

  if (token && role === 'admin') {
    console.log("is valid");

    return true;
  }

  this.router.navigate(['/login']);
  return false;

}
}
