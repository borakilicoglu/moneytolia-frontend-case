import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private platformId = inject(PLATFORM_ID);

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
    // If we're in the browser and the user is logged in, allow access
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // If we're on the server, allow the navigation to proceed
    // This prevents the login page flash during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    // Only redirect to login if we're in the browser and not logged in
    return this.router.createUrlTree(['/login']);
  }
}
