import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { YoutubeApiItem, YoutubeApiResponse, YoutubeVideoModel } from '../models/videosT';

@Injectable({
  providedIn: 'root',
})
export class VideosS {
  private readonly http = inject(HttpClient);

  private readonly API_KEY = environment.apiYoutubeKey;
  private readonly API_URL = environment.apiYoutubeUrl;
  private readonly API_SEARCH_URL = `${this.API_URL}/search`;
  private readonly API_VIDEO_URL = `${this.API_URL}/videos`;
  private readonly MAX_RESULTS: number = 20;

  videosFound: WritableSignal<YoutubeVideoModel[]> = signal<YoutubeVideoModel[]>([])
  searchInput: WritableSignal<string> = signal<string>('')

  searchVideos(query: string): void {
    this.searchInput.set(query);
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('type', 'video')
      .set('maxResults', this.MAX_RESULTS)
      .set('q', query)
      .set('key', this.API_KEY);

    this.http.get<YoutubeApiResponse>(this.API_SEARCH_URL, { params }).pipe(
      map((response) => response.items
        .filter(item => typeof item.id === 'string' || (typeof item.id === 'object' && !!item.id.videoId))
        .map(item => this.mapToYoutubeVideoModel(item))
      )
    ).subscribe(videos => {
      this.videosFound.set(videos);
    });
  }

  getVideos(regionCode: string = 'FR'): Observable<YoutubeApiResponse> {
  const params = new HttpParams()
    .set('part', 'snippet')
    .set('chart', 'mostPopular')
    .set('regionCode', regionCode)
    .set('maxResults', this.MAX_RESULTS)
    .set('key', this.API_KEY);

    return this.http.get<YoutubeApiResponse>(this.API_VIDEO_URL, { params });
  }

  getVideoById(id: string): Observable<YoutubeVideoModel | undefined> {
    const params = new HttpParams()
      .set('part', 'snippet,contentDetails,statistics')
      .set('id', id)
      .set('key', this.API_KEY);

    return this.http.get<YoutubeApiResponse>(this.API_VIDEO_URL, { params }).pipe(
      map((response) => {
        const item = response.items[0];
        if (!item) return undefined;
        return this.mapToYoutubeVideoModel(item);
      })
    );
  }

  private mapToYoutubeVideoModel(item: YoutubeApiItem): YoutubeVideoModel {
    const videoId = typeof item.id === 'string' ? item.id : item.id.videoId!;
    return {
      id: videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt
    };
  }
}
