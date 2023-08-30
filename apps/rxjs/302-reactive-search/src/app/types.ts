export interface ImageMetadata {
  thumbnail: string;
  title: string;
}

export interface RedditResponse {
  data: {
    children: RedditResponseChild[];
  };
}

export interface RedditResponseChild {
  data: ImageMetadata;
}
