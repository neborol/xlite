import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VERSION, MatDialog, MatTabGroup } from '@angular/material';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/response.interface';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpEventType } from '@angular/common/http';
import { TabDescr } from '../../news/news.component';
import { CockpitVideosService } from 'src/app/services/cockpit-videos.service';
import { IVideoPost } from 'src/app/interfaces/video-post.interface';
import { CockpitSharedService } from 'src/app/services/cockpit-shared.service';
import { IVideoGet } from 'src/app/interfaces/video-get.interface';
import { VideosService } from 'src/app/services/videos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from './../../../services/spinner.service';

export interface IvideoData {
  video: File;
  posterPath: string;
}


@Component({
  selector: 'app-editvideos',
  templateUrl: './editvideos.component.html',
  styleUrls: ['./editvideos.component.scss']
})
export class EditvideosComponent implements OnInit {
  tabIndex = 0;
  tabDescriptionObject: TabDescr[];
  alphaNRegex = environment.alphaNRegex;
  editAlphaNRegex = environment.editAlphaNRegex;
  selected = 'None';
  videoData: IVideoGet[];
  addVideoForm: FormGroup;
  editVideoForm: FormGroup;
  newsScrollbarForm: FormGroup;
  editingCategoriesForm: FormGroup;
  imgPath = 'image.jpg';


  photoMessage: string;
  photoProgress: number;
  videoMessage: string;
  videoProgress: number;
  baseUrl = environment.apiUrl;
  posterResponse: { body: {dbPath: '', message: ''} };
  videoFileResponse: { body: {dbPath: '', message: ''} };
  videoPosterImageplaceholderPath = '/assets/images/uploadIco.png';
  videoPhoto2bUploaded = '/assets/images/upload-vid-icon.png';

  videoFile2bUploaded: File;
  videoPosterFileToUpload: File = null;
  videoPosterFileName = '';
  videoFileName = '';
  // videoPosterToUpload = '';

  photoModel: FormData;
  videoModel: FormData;
  videoAndPhotoPathObj: any = {};

  rootUrl: string = environment.rootUrl;
  files: FormData;
  vidfiles: FormData;
  pos = 'before';

  addVideo = true;
  editVideo = false;

  currentSelectedVideo;
  idx = 0;
  subscr: Subscription;
  @ViewChild('videoEditTab', {static: true}) tabGroup: MatTabGroup;


  constructor(
    private alertify: AlertifyService,
    private cockpitVideosService: CockpitVideosService,
    private videosService: VideosService,
    private sharedService: CockpitSharedService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private router: Router
    ) { }

  ngOnInit() {
    // USE THE URL TO NAVIGATE TO AS SPECIFIC MatTab page.
    // Pass a handle to unsubscribe from this observable
/*    this.subscr = this.route.params.subscribe(p => {
      this.tabGroup.selectedIndex = +p['idx'];
    });
*/
    this.addVideoForm = new FormGroup({
      'videoTitle': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(28), Validators.pattern(this.alphaNRegex)]),
      'videoCategory': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern(this.alphaNRegex)]),
      'videoDescription': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(60), Validators.pattern(this.alphaNRegex)]),
    });


    this.editingCategoriesForm = new FormGroup({
      'newsEditingCategory': new FormControl('', [Validators.required])
    });

    this.videosService.getVideos().subscribe((videos: IVideoGet[]) => {
      this.videoData = videos.sort((a: any, b: any) => {
        return (new Date(b.dateCreated) as any) - (new Date(a.dateCreated) as any);
      });
      console.log('TestVid', this.videoData);
    });

  }


  handlePosterPreview(files) {
    // If there is no file, stop and get out.
    if (files.length === 0) {
      return;
    }
   // Else, there is a file, so proceed.
    // Pass the selected file name to the property at the top, so that it gets displayed to the user.
    const fileToProcess = files[0] as File;

    // In order to process a file, it has to be an instance of the FormData() class, so create an instance
    const formData = new FormData();

    // After creating an instance, you can now use the append method to attach a file.
    formData.append('file', fileToProcess, fileToProcess.name);
    /* formData.append('caption', this.model.caption); */

    // After appending the file to the FormData instance, send it along with any other data.
    // this.model.formData = formData;

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.videoPosterImageplaceholderPath = event.target.result;
      this.photoModel = formData;
      this.videoPosterFileName = fileToProcess.name;
    };
    reader.readAsDataURL(fileToProcess);
  }


  handleVideoPreview(files) {
    // If there is no file, stop and get out.
    if (files.length === 0) {
      return;
    }
   // Else, there is a file, so proceed.
    // Pass the selected file name to the property at the top, so that it gets displayed to the user.
    const fileToProcess = files[0] as File;

    // In order to this file as part of a form, it could be put in a FormData() class, so create an instance
    const formData = new FormData();

    // After creating an instance, you can now use the append method to attach a file.
    formData.append('Videofile', fileToProcess, fileToProcess.name);
    /* formData.append('caption', this.model.caption); */

    // After appending the file to the FormData instance, send it along with any other data.
    // this.model.formData = formData;
    const videoDta: IvideoData = {video: null, posterPath: ''};

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.videoFile2bUploaded = event.target.result;
      this.videoModel = formData;
      this.videoFileName = fileToProcess.name;

      videoDta.video = event.target.result;
      videoDta.posterPath = fileToProcess.name;
    };

    reader.readAsDataURL(fileToProcess);
  }

  uploadVideoData = () => {
    // Save the news image first, and if successful, save the rest of the data.
    // this.photoService.uploadImage(this.files).subscribe(event => {
    this.sharedService.uploadVideoFile(this.videoModel).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.videoProgress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.videoMessage = 'Upload Success';
        this.alertify.success('Video Upload was successful');
        this.videoAndPhotoPathObj.videoPathObj = event.body;
        this.uploadPhotoFile();
      }
    });
  }

  uploadPhotoFile = () => {
    // Save the news image first, and if successful, save the rest of the data.
    // this.photoService.uploadImage(this.files).subscribe(event => {
    this.sharedService.uploadVideoImage(this.photoModel).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.photoProgress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.photoMessage = 'Upload Success';
        this.alertify.success('Image Upload was successful');
        this.videoAndPhotoPathObj.photoPathObj = event.body;
        this.SubmitVideoData();
      }
    });
  }


  SubmitVideoData() {
    this.spinnerService.showSpinner();
    const videoData: IVideoPost = {
      videoTitle: this.addVideoForm.get('videoTitle').value,
      videoDescription: this.addVideoForm.get('videoDescription').value,
      videoCategory: this.addVideoForm.get('videoCategory').value,
      videoPhotoFilePath: this.videoAndPhotoPathObj.photoPathObj.dbPath,
      videoFilePath: this.videoAndPhotoPathObj.videoPathObj.dbPath
    };
    this.cockpitVideosService.postVideoData(videoData)
    .subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
        this.spinnerService.hideSpinner();
        this.router.navigate(['cockpit/editvideos/', 1]);
        this.ngOnInit();
        this.subscr = this.route.params.subscribe(p => {
          // grab the selected index from the url and pass it to the tab.
          this.tabGroup.selectedIndex = +p['idx'];
        });
      }
      // Reset the form back to empty
      this.addVideoForm.reset();
      this.videoPosterFileName = '';
      this.videoPosterImageplaceholderPath = '/assets/images/uploadIco.png';
      this.videoFile2bUploaded = null;
    }, error => {
      this.alertify.error('Video Data creation failed.');
    });
  }


  editSelectedVideo(templateRef: TemplateRef<any>, data) {
    this.currentSelectedVideo = data;

    this.editVideoForm = new FormGroup({
      'title': new FormControl(data.title, [Validators.required, Validators.minLength(5), Validators.maxLength(60), Validators.pattern(this.alphaNRegex)]),
      'description': new FormControl(data.description, [Validators.required, Validators.minLength(3), Validators.maxLength(250), Validators.pattern(this.alphaNRegex)]),
    });

    this.dialog.open(templateRef);
  }

  deleteVideoRequest() {
    this.alertify.confirm('Are you really sure you want to delete this video?', () => {
      this.deleteAVideoItem();
    });
  }

  deleteAVideoItem() {
    this.cockpitVideosService.deleteAVideo(this.currentSelectedVideo.videoId)
    .subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
      }
    });
  }

  updateAVideoItem() {
    this.spinnerService.showSpinner();
    this.cockpitVideosService.updateVideoData(this.editVideoForm.value, this.currentSelectedVideo.videoId)
    .subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
        this.spinnerService.hideSpinner();
        this.router.navigate(['cockpit/editvideos/', 1]);
        this.ngOnInit();
        this.subscr = this.route.params.subscribe(p => {
          // grab the selected index from the url and pass it to the tab.
          this.tabGroup.selectedIndex = +p['idx'];
        });
      }
      // Reset the form back to empty
      this.editVideoForm.reset();
    }, error => {
      this.alertify.error('Video update failed.');
    });
  }

  tabchange(evt) {
    switch (evt.index) {
      case 0: this.addVideo = true;
              break;
      case 1: this.editVideo = true;
              break;
    }
  }

}
