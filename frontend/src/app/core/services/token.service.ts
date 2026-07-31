import { Injectable, OnInit } from "@angular/core";


@Injectable({
  providedIn:'root'
})
export class TokenService {

    setLocalStorageTokes(tokenValue:string, rolesValue: string): void{
      localStorage.setItem('token', tokenValue);
      localStorage.setItem('roles', rolesValue)
    }

    setSessionStorageTokes(tokenValue:string, rolesValue: string): void{
      sessionStorage.setItem('token', tokenValue);
      sessionStorage.setItem('roles', rolesValue)
    }

    getToken(): string | null {
      return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    getRoles(): string | null {
      return localStorage.getItem('roles') || sessionStorage.getItem('roles');
    }

    removeToken(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('roles');

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('roles');
    }


}
