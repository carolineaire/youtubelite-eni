import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./partials/footer/footer";
import { Navbar } from './partials/navbar/navbar';
import { PlaylistBar } from './partials/playlist-bar/playlist-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, PlaylistBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('youtubelite-eni');
}
