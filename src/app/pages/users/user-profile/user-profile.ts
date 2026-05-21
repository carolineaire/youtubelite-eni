import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthS } from '../../../auth/services/auth-s';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  user = signal<UserT | null>(null);

  private readonly location = inject(Location);
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

  goBack(){
    this.location.back();
  }
}
