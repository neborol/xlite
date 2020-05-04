import { Component, OnInit, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
  message: string;
  progress: number;
  @Output() public fileUploadFinished: any = new EventEmitter();
  baseUrl = environment.apiUrl;
  response: { dbPath: ''};
  image2bUploaded = '/assets/images/chevron.png';
  // image2bUploaded = '/assets/images/uploadIco.png';
  fileToUpload: File = null;
  model: any = {};
  rootUrl: string = environment.rootUrl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fileUploadFinished = (event) => {
      this.response = event;
    };
  }

  uploadFile = () => {
    // If there is no file, stop and get out.
/*    if (files.length === 0) {
      return;
    }

    // Else, there is a file, so proceed.
    const fileToUpload = files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name); */

//    this.http.post(this.baseUrl + 'upload', this.model.formData, { reportProgress: true, observe: 'events' })
    this.http.post(this.baseUrl + 'upload', this.model.formData, { reportProgress: true, observe: 'events' })
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.message = 'Upload Success';
        this.fileUploadFinished.emit(event.body);
      }
    });
  }

  handleFileInput(files) {
    // If there is no file, stop and get out.
    if (files.length === 0) {
      return;
    }

    // Else, there is a file, so proceed.
    const fileToUpload = files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('caption', this.model.caption);
//    this.model.formData = formData;

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.image2bUploaded = event.target.result;
      this.model.formData = formData;
    };
    reader.readAsDataURL(fileToUpload);
  }

  createImagePath(serverPath: string) {
    return 'http://location:5001/' + serverPath;
  }

}
