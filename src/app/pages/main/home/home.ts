import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosS } from '../../../services/videos-s';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  notif!: string
  videos = signal<any[]>([]);

  private readonly params: ActivatedRoute = inject(ActivatedRoute)
  private readonly videosService = inject(VideosS);

  ngOnInit() {
    this.videosService.getVideos().subscribe(res => {
      this.videos.set(res.items);
      console.log(res);
    })
    this.notif = this.params.snapshot?.queryParams['message'] ?? null;
  }
}
