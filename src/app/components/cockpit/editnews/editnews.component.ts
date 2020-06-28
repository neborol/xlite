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
import { CockpitSharedService } from 'src/app/services/cockpit-shared.service';

@Component({
  selector: 'app-editnews',
  templateUrl: './editnews.component.html',
  styleUrls: ['./editnews.component.scss']
})
export class EditnewsComponent implements OnInit {
  tabIndex = 0;
  tabDescriptionObject: TabDescr[];
  alphaNRegex = environment.alphaNRegex;
  editAlphaNRegex = environment.editAlphaNRegex;
  selected = 'None';
  newsAddForm: FormGroup;
  newsScrollbarForm: FormGroup;
  editingCategoriesForm: FormGroup;
  articleEditForm: any = {};
  imgPath = 'image.jpg';
  articlesArrayForEditing: INewsArticlesGet[] = [];

  diplomaticData: INewsArticlesGet[] = [];
  homeAwayData: INewsArticlesGet[] = [];
  generalData: INewsArticlesGet[] = [];

  message: string;
  progress: number;
  baseUrl = environment.apiUrl;
  response: { dbPath: ''};
  image2bUploaded = '/assets/images/uploadIco.png';
  fileToUpload: File = null;
  model: any = {};
  rootUrl: string = environment.rootUrl;
  files: FormData;
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
    private cockpitNewsService: CockpitNewsService,
    private sharedService: CockpitSharedService,
    private newsService: NewsService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.newsAddForm = new FormGroup({
      'newsTitle': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(250), Validators.pattern(this.alphaNRegex)]),
      'newsSummary': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(350), Validators.pattern(this.alphaNRegex)]),
      'newsFullStory': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2000), Validators.pattern(this.alphaNRegex)]),
      'newsCategory': new FormControl('', [Validators.required])
    });

    this.newsScrollbarForm = new FormGroup({
      'newsScrollbar': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300), Validators.pattern(this.alphaNRegex)]),
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


  handleFileInput(files) {
    // If there is no file, stop and get out.
    if (files.length === 0) {
      return;
    }
   // Else, there is a file, so proceed.
    // Pass the selected file name to the property at the top, so that it gets displayed to the user.
    this.fileToUpload = files[0].name;

    const fileToProcess = files[0] as File;

    // In order to process a file, it has to be an instance of the FormData() class, so create an instance
    const formData = new FormData();

    // After creating an instance, you can now use the append method to attach a file.
    formData.append('file', fileToProcess, fileToProcess.name);
    /* formData.append('caption', this.model.caption); */

    // After appending the file to the FormData instance, send it along with any other data.
    this.model.formData = formData;

    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.image2bUploaded = event.target.result;
      this.files = formData;
      this.model.formData = formData;
    };
    reader.readAsDataURL(fileToProcess);
  }

  postScrollingMessage = () => {
      const scrollingData = {
        newsScrollbar: this.newsScrollbarForm.get('newsScrollbar').value
      };

      this.cockpitNewsService.addAScrollingNewsItem(scrollingData)
      .subscribe((resp: IResponse) => {
        if (resp.success) {
          this.alertify.success(resp.message);
          // Reset the form back to empty
          this.newsScrollbarForm.reset();
        }
      }, error => {
        this.alertify.error('The Scolling message did not get added.');
      });
  }

  postNewsArticle = () => {
    // Save the news image first, and if successful, save the rest of the data.
    this.sharedService.uploadNewsImage(this.files).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.message = 'Upload Success';
        this.alertify.success('Image Upload was successful');
        this.fileUploadFinished(event);
      }
    });
  }

  fileUploadFinished(event) {
    this.response = event; // event.body.dbPath is the path to which the image has been saved, so proceed and save the path to the database.
    this.cockpitNewsService.addANewsItem(this.newsAddForm.value, event.body.dbPath)
    .subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
      }
      // Reset the form back to empty
      this.newsAddForm.reset();
      this.image2bUploaded = '/assets/images/uploadIco.png';
    }, error => {
      this.alertify.error('News to be added failed.');
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

  updateNewsArticle() {
    if (this.files) {
      this.sharedService.uploadNewsImage(this.files).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload Success';
          this.alertify.success('Image Upload was successful');
          this.updateImageCompleted(event);
        }
      });
    } else {
      this.updateImageCompleted();
    }
  }

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

    this.cockpitNewsService.updateNewsArticle(objToUpdate)
    .subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
      }
      // Reset the form back to empty
      this.articleEditForm.reset();
      this.image2bUploaded = '/assets/images/uploadIco.png';
    }, error => {
      this.alertify.error('Article update failed.');
    });
  }

}
