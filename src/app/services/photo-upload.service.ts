import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploadService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadImage(imageData: FormData) {
    return this.http.post(this.baseUrl + 'Upload/imageUpload', imageData, { reportProgress: true, observe: 'events' });
  }

}
