import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthResponseT } from '../models/AuthResponseT';

@Injectable({
  providedIn: 'root',
})
export class AuthS {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUsersUrl;

  //Endpoint
  private readonly loginEp = `${this.apiUrl}/users/login`;
  private readonly registerEp = `${this.apiUrl}/users/register`;
  private readonly meEp = `${this.apiUrl}/users/me`;
  private readonly editEp = `${this.apiUrl}/users/profile/:id`;

  private readonly loggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  isLoggedIn$ = this.loggedIn.asObservable();


  login(cred: CredentialsT): Observable<AuthResponseT> {
    return this.http.post<AuthResponseT>(this.loginEp, cred).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.loggedIn.next(true);
      })
    );
  }

  register(user: CreateUserT): Observable<AuthResponseT> {
    return this.http.post<AuthResponseT>(this.registerEp, user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): Observable<UserT | null> {
    return this.http.get<UserT>(this.meEp);
  }

  getStoredUser(): UserT | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getCurrentStatus(): boolean{
    return this.loggedIn.value;
  }
}
