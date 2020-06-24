import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IRatingsObjectPost } from '../interfaces/video-rating.interface';
import { IMissionPhotoUpdate } from '../interfaces/mission-photo-update.interface';


@Injectable({
  providedIn: 'root'
})

export class VideosService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getVideos(category?: string) {
        if (category) {
            return this.http.get(this.baseUrl + 'Videos/getCategorizedVideos/' + category);
        } else {
            return this.http.get(this.baseUrl + 'Videos/getVideos');
        }
    }

    postVideoRating(ratingsObj: IRatingsObjectPost) {
        return this.http.post(this.baseUrl + 'Videos/postRatings', ratingsObj);
    }

}
