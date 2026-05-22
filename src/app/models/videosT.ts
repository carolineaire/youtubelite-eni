export interface YoutubeVideoModel {
  id: string;
  title: string;
  description: string;
  thumbnails: string
  channelTitle: string;
  channelId: string;
  publishedAt: string;
}

export interface YoutubeSnippet {
  title: string;
  description: string;
  publishedAt: string;
  channelTitle: string;
  channelId: string;
  thumbnails: {
    high: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
}

export interface YoutubeApiItem {
  id: string | { videoId?: string; channelId?: string };
  snippet: YoutubeSnippet;
}

export interface YoutubeApiResponse {
  items: YoutubeApiItem[];
}