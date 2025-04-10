import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
    // If user is NOT logged in, allow access to the route
    if (!this.authService.isLoggedIn()) {
      return true;
    }

    // If user is already logged in, redirect to campaigns page
    return this.router.createUrlTree(['/campaigns']);
  }
}
