import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { INewsPost } from '../interfaces/news-post.interface';
import { IScrollNewsPost } from '../interfaces/scroll-news-interface';
import { IArticleUpdate } from '../interfaces/article-update.interface';
import { IVideoPost } from '../interfaces/video-post.interface';

@Injectable({
  providedIn: 'root'
})
export class CockpitVideosService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  postVideoData(videoItemObj: IVideoPost) {
    return this.http.post(this.baseUrl + 'CockpitVideos/addAVideoItem', videoItemObj);
  }

  updateVideoData(newsItemObj: IArticleUpdate) {
    const updateArticle: INewsPost = {
        newsTitle: newsItemObj.editNewsTitle,
        newsSummary: newsItemObj.editNewsSummary,
        newsFullStory: newsItemObj.editNewsFullStory,
        newsCategory: newsItemObj.editNewsCategory,
        imagePath: !!newsItemObj.editImagePath ? newsItemObj.editImagePath : ''
    };
    const newsId = newsItemObj.newsId;
    return this.http.put(this.baseUrl + 'cockpitVideos/updateVideoData/' + newsId, updateArticle);
  }


  uploadImage(imageData: FormData) {
    return this.http.post(this.baseUrl + 'Upload/imageUpload', imageData, { reportProgress: true, observe: 'events' });
  }


  uploadVideoFile(videoFile: FormData) {
    return this.http.post(this.baseUrl + 'Upload/imageUpload', videoFile, { reportProgress: true, observe: 'events' });
  }


}
