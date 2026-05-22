import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosS } from '../../../services/videos-s';
import { AuthS } from '../../../auth/services/auth-s';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  notif!: string
  videos = signal<any[]>([]);
  isAuth = signal<boolean>(false);

  private readonly params: ActivatedRoute = inject(ActivatedRoute)
  private readonly videosService = inject(VideosS);
  private readonly authService = inject(AuthS);

  ngOnInit() {
    this.videosService.getVideos().subscribe(res => {
      this.videos.set(res.items);
      console.log(res);
    })
    this.authService.isLoggedIn$.subscribe(status => {
      this.isAuth.set(status);
      console.log('Authentication status:', status);
    });
    this.notif = this.params.snapshot?.queryParams['message'] ?? null;
  }
}
