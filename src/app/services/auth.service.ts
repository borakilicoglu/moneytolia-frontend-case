import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    // other user properties
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private authTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    // Initialize the token from localStorage if in browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('auth_token');
      this.authTokenSubject.next(token);
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    // Simple mock implementation
    if (username === 'admin' && password === 'password123') {
      const response: LoginResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          username: 'admin',
        },
      };

      // Store token in subject
      this.authTokenSubject.next(response.token);

      // Store the token in localStorage if in browser
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      // Return the response with a delay to simulate network latency
      return of(response).pipe(delay(800));
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  logout(): void {
    this.authTokenSubject.next(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  isLoggedIn(): boolean {
    return (
      !!this.authTokenSubject.value ||
      (isPlatformBrowser(this.platformId) &&
        !!localStorage.getItem('auth_token'))
    );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null; // When on server, no token is available
  }
}
