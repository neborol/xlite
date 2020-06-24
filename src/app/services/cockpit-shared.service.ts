import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CockpitSharedService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadNewsImage(imageData: FormData) {
    const topFolder = 'NewsAssets'; // Folders where file will be saved under
    const innerFolder = 'Images';  // Folders where file will be saved in
    return this.http.post(this.baseUrl + 'Upload/fileUpload/' + topFolder + '/' + innerFolder, imageData, { reportProgress: true, observe: 'events' });
  }

  uploadVideoImage(imageData: FormData) {
    const topFolder = 'MissionVideos'; // Folders where file will be saved under
    const innerFolder = 'Images'; // Folders where file will be saved in
    return this.http.post(this.baseUrl + 'Upload/fileUpload/' + topFolder + '/' + innerFolder, imageData, { reportProgress: true, observe: 'events' });
  }

  uploadVideoFile(videoFile: FormData) {
    const topFolder = 'MissionVideos';  // Folders where file will be saved under
    const innerFolder = 'Videos'; // Folders where file will be saved in
    return this.http.post(this.baseUrl + 'Upload/fileUpload/' + topFolder + '/' + innerFolder, videoFile, { reportProgress: true, observe: 'events' });
  }
}
