import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { AuthS } from '../../auth/services/auth-s';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [SearchBar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isAuth = signal<boolean>(false);
  private readonly authService = inject(AuthS);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
  this.authService.isLoggedIn$.subscribe((status) => {
    this.isAuth.set(status);
    console.log('Authentication status:', status);
  });
}

  onLogout() {
    this.authService.logout();
    this.isAuth.set(false);
    this.router.navigate(['/']);
  }
}
