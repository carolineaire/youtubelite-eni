import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthS } from '../../auth/services/auth-s';

@Component({
  selector: 'app-playlist-bar',
  imports: [],
  templateUrl: './playlist-bar.html',
  styleUrl: './playlist-bar.css',
})
export class PlaylistBar implements OnInit {
  user = signal<UserT | null>(null);

  private readonly authService = inject(AuthS);

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user.set(user);
        console.log('Current user:', user);
      },
      error: (err) => {
        console.error(err);
        this.user.set(null);
      },
    });
  }
}
