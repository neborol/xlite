import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMissionPhotoUpdate } from '../interfaces/mission-photo-update.interface';

@Injectable({
  providedIn: 'root'
})
export class CockpitPhotoService {

  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  UpdateMissionImages(imgObj: IMissionPhotoUpdate, photoId) {
    return this.http.put(this.baseUrl + 'CockpitPhotos/updateMissionPhoto/' + photoId, imgObj);
  }

  deleteSelectedphoto(photoId) {
    return this.http.delete(this.baseUrl + 'CockpitPhotos/deleteMissionPhoto/' + photoId);
  }

}
