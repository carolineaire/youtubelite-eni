import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideosS } from '../../services/videos-s';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeVideoModel } from '../../models/videosT';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.html',
  styleUrl: './player.css',
})
export class Player implements OnInit {
  video = signal<YoutubeVideoModel | null>(null);
  videoUrl = signal<SafeResourceUrl | null>(null);

  private readonly params: ActivatedRoute = inject(ActivatedRoute)
  private readonly videosService = inject(VideosS);
  private readonly sanitizer = inject(DomSanitizer);

  ngOnInit() {

    const id = this.params.snapshot.queryParams['id'];

    if (!id) return;

    this.videosService.getVideoById(id).subscribe(video => {

      if (video) {

        this.video.set(video);

        const url = `https://www.youtube.com/embed/${video.id}`;

        this.videoUrl.set(
          this.sanitizer.bypassSecurityTrustResourceUrl(url)
        );
      }
    });
  }
}
