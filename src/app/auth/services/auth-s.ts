import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthS {
  private readonly loggedIn = new BehaviorSubject<boolean>(false);

   isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    //Vérifie LS au démarrage
    const savedStatus = localStorage.getItem('isLoggedIn');
    if (savedStatus) {
      this.loggedIn.next(JSON.parse(savedStatus));
    }
  }

  login(): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.loggedIn.next(false);
  }

  getCurrentStatus(): boolean{
    return this.loggedIn.value;
  }
}
