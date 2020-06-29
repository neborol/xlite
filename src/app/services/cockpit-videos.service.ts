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

  updateVideoData(videoEditObj: any, id) {
    return this.http.put(this.baseUrl + 'cockpitVideos/updateVideoData/' + id, videoEditObj);
  }


  uploadImage(imageData: FormData) {
    return this.http.post(this.baseUrl + 'Upload/imageUpload', imageData, { reportProgress: true, observe: 'events' });
  }


  uploadVideoFile(videoFile: FormData) {
    return this.http.post(this.baseUrl + 'Upload/imageUpload', videoFile, { reportProgress: true, observe: 'events' });
  }

  deleteAVideo(videoId) {
    return this.http.delete(this.baseUrl + 'cockpitVideos/deletevideo/' + videoId);
  }

}
