import { Component, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { VERSION, MatDialog } from '@angular/material';
import { FileInput } from 'ngx-material-file-input';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/response.interface';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CockpitNewsService } from 'src/app/services/cockpit-news.service';
import { HttpEventType } from '@angular/common/http';
import { TabDescr } from '../../news/news.component';
import { INewsArticlesGet } from 'src/app/interfaces/news-article-get.interface';
import { NewsService } from 'src/app/services/news.service';
import { IArticleUpdate } from 'src/app/interfaces/article-update.interface';
import { CockpitVideosService } from 'src/app/services/cockpit-videos.service';
import { IVideoPost } from 'src/app/interfaces/video-post.interface';
import { CockpitSharedService } from 'src/app/services/cockpit-shared.service';

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
  addVideoForm: FormGroup;
  newsScrollbarForm: FormGroup;
  editingCategoriesForm: FormGroup;
  articleEditForm: any = {};
  imgPath = 'image.jpg';
  articlesArrayForEditing: INewsArticlesGet[] = [];

  diplomaticData: INewsArticlesGet[] = [];
  homeAwayData: INewsArticlesGet[] = [];
  generalData: INewsArticlesGet[] = [];

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
  loadArticles = false;
  currentArticle: INewsArticlesGet;
  currentUpdateArticle: INewsArticlesGet = {
    newsId: 0,
    newsTitle: '',
    newsSummary: '',
    newsFullStory: '',
    newsCategory: '',
    datePublished: new Date(),
    imagePath: '',
  };

  constructor(
    private alertify: AlertifyService,
    private cockpitVideosService: CockpitVideosService,
    private sharedService: CockpitSharedService,
    private newsService: NewsService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.addVideoForm = new FormGroup({
      'videoTitle': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(28), Validators.pattern(this.alphaNRegex)]),
      'videoCategory': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern(this.alphaNRegex)]),
      'videoDescription': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(60), Validators.pattern(this.alphaNRegex)]),
    });


    this.editingCategoriesForm = new FormGroup({
      'newsEditingCategory': new FormControl('', [Validators.required])
    });

    // this.articleEditForm = new FormGroup({
    //   'editNewsTitle': new FormControl('', [Validators.minLength(10), Validators.maxLength(250), Validators.pattern(this.alphaNRegex)]),
    //   'editNewsSummary': new FormControl('', [Validators.minLength(10), Validators.maxLength(350), Validators.pattern(this.alphaNRegex)]),
    //   'editNewsFullStory': new FormControl('', [Validators.minLength(10), Validators.maxLength(2000), Validators.pattern(this.alphaNRegex)]),
    // });
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

  selectionChanged(option) {
    this.loadArticles = true;
    switch (option) {
      case 'diplomatic':
            this.newsService.getNewsArticles('diplomatic').subscribe((diplomaticItems: INewsArticlesGet[]) => {
              this.diplomaticData = diplomaticItems;
              this.articlesArrayForEditing = this.diplomaticData;
            });
            break;

      case 'home-away':
            this.newsService.getNewsArticles('home-away').subscribe((homeAwayItems: INewsArticlesGet[]) => {
              this.homeAwayData = homeAwayItems;
              this.articlesArrayForEditing = this.homeAwayData;
            });
            break;

      case 'general':
            this.newsService.getNewsArticles('general').subscribe((generalItems: INewsArticlesGet[]) => {
              this.generalData = generalItems;
              this.articlesArrayForEditing = this.generalData;
            });
            break;
    }
  }

  toggleArticlesDisplay() {
    this.loadArticles = !this.loadArticles;
  }

  editSelectedArticle(templateRef: TemplateRef<any>, article) {
    this.currentUpdateArticle = article;
    console.log('Testinggg', this.currentUpdateArticle);

    this.dialog.open(templateRef);
  }

  closeModal() {
    this.dialog.closeAll();
  }

  // updateNewsArticle() {
  //   if (this.photoFiles) {
  //     this.photoUploadService.uploadImage(this.files).subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       } else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload Success';
  //         this.alertify.success('Image Upload was successful');
  //         this.updateImageCompleted(event);
  //       }
  //     });
  //   } else {
  //     this.updateImageCompleted();
  //   }


  //   if (this.videoFiles) {
  //     this.videoUploadService.uploadImage(this.files).subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       } else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload Success';
  //         this.alertify.success('Image Upload was successful');
  //         this.updateImageCompleted(event);
  //       }
  //     });
  //   } else {
  //     this.updateImageCompleted();
  //   }
  // }

  validateText(input) {
    if (this.editAlphaNRegex.test(input)) {
      return true;
    } else {
      return false;
    }
  }

  updateImageCompleted(event?) {
    // this.response = event; // event.body.dbPath is the path to which the image has been saved, so proceed and save the path to the database.
    const objToUpdate: IArticleUpdate = {
      newsId: this.validateText(this.currentUpdateArticle.newsId) ? this.currentUpdateArticle.newsId : 0,
      editNewsTitle: this.validateText(this.currentUpdateArticle.newsTitle) ? this.currentUpdateArticle.newsTitle : '',
      editNewsSummary: this.validateText(this.currentUpdateArticle.newsSummary) ? this.currentUpdateArticle.newsSummary : '',
      editNewsFullStory: this.validateText(this.currentUpdateArticle.newsFullStory) ? this.currentUpdateArticle.newsFullStory : '',
      editNewsCategory: this.validateText(this.editingCategoriesForm.value.newsEditingCategory) ? this.editingCategoriesForm.value.newsEditingCategory : '',
      editImagePath: ''
    };

    if (event) {
      objToUpdate.editImagePath = event.body.dbPath;
    }

    this.cockpitVideosService.updateVideoData(objToUpdate)
    .subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
      }
      // Reset the form back to empty
      this.articleEditForm.reset();
      this.videoPosterImageplaceholderPath = '/assets/images/uploadIco.png';
    }, error => {
      this.alertify.error('Article update failed.');
    });
  }

}
