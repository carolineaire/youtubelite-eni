import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./partials/footer/footer";
import { Navbar } from './partials/navbar/navbar';
import { PlaylistBar } from './partials/playlist-bar/playlist-bar';
import { AuthS } from './auth/services/auth-s';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, PlaylistBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('youtubelite-eni');
  protected readonly authService = inject(AuthS);
  isAuth = signal<boolean>(false);

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isAuth.set(status);
      console.log('Authentication status:', status);
    });
  }
}
