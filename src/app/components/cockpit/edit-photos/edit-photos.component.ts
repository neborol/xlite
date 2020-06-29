import { Component, OnInit, Output, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventEmitter } from 'events';
import { ImagesService } from '../../../services/images.service';
import { AlertifyService } from '../../../services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTabGroup } from '@angular/material';
import { CockpitPhotoService } from './../../../services/cockpit-photos.service';
import { IResponse } from 'src/app/interfaces/response.interface';
import { SpinnerService } from './../../../services/spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-photo-upload',
  templateUrl: './edit-photos.component.html',
  styleUrls: ['./edit-photos.component.scss']
})
export class EditPhotosComponent implements OnInit {
  message: string;
  progress: number;
  @Output() public fileUploadFinished: any = new EventEmitter();
  baseUrl = environment.apiUrl;
  response: { dbPath: ''};
  image2bUploaded = 'assets/images/uploadIco.png';
  fileToUpload: File = null;
  model: any = {};
  multiFormData: FormData;
  imagesUrls: string[] = [];
  rootUrl: string = environment.rootUrl;

  files2: any[] = [];

  // Images coming from the backend, to be edited and then sent back.
  photos2Edit: any[] = [];
  currentImage2UpdateForm: FormGroup;
  currentSelectedPhoto;
  alphaNRegex = environment.alphaNRegex;
  editAlphaNRegex = environment.editAlphaNRegex;
  deleteRequested = false;
  addPhotoTab = true;
  editPhotoTab = false;

  idx = 0;
  subscr: Subscription;
  @ViewChild('photoEditTab', {static: true}) tabGroup: MatTabGroup;

  constructor(
    private imagesService: ImagesService,
    private alertify: AlertifyService,
    public dialog: MatDialog,
    private spinnerService: SpinnerService,
    private cockpitPhotoService: CockpitPhotoService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.fileUploadFinished = (event) => {
      this.response = event;
    };

    this.spinnerService.showSpinner();
    this.imagesService.getMissionImages().subscribe((res: any[]) => {
      this.photos2Edit = res.map(ph => {
        ph.uniquePhotoName = this.rootUrl + ph.uniquePhotoName;
        this.spinnerService.hideSpinner();
        return ph;
      });
    });

    this.currentImage2UpdateForm = new FormGroup({
      'caption': new FormControl('', [Validators.minLength(10), Validators.maxLength(280), Validators.pattern(this.alphaNRegex)]),
      'category': new FormControl('', [Validators.minLength(3), Validators.maxLength(40), Validators.pattern(this.alphaNRegex)])
    });
  }

  uploadMultiple = () => {
    this.spinnerService.showSpinner();
    this.imagesService.postMissionImages(this.multiFormData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(event.loaded * 100 / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload Success';
          this.alertify.success('The images were created.');
          this.spinnerService.hideSpinner();
          this.router.navigate(['cockpit/editphotos/', 1]);
          this.ngOnInit();
          this.subscr = this.route.params.subscribe(p => {
            // grab the selected index from the url and pass it to the tab.
            this.tabGroup.selectedIndex = +p['idx'];
          });
        }
      }, error => this.alertify.error('Photo upload multiple failed.'));
  }


  handleMultipleInput(event) {
    // If there is no file, stop and get out.
    if (event.target.files.length === 0) {
      return;
    }
    const allFiles: File[] = event.target.files as File[];

    if (allFiles.length > 25) {
      this.alertify.error('Number of files exceeded');
      return;
    }

    const formData = new FormData();

    if (event.target.files) {
      for (let i = 0; i < allFiles.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        formData.append(`file${i}`, allFiles[i], allFiles[i].name );
        reader.onload = (events: any) => {
          this.imagesUrls.push(events.target.result);
        };
      }
    }

    this.multiFormData = formData;
  }

  cancelPreviewImages() {
    this.imagesUrls = [];
    this.progress = 0;
  }


  editSelectedPhoto(templateRef: TemplateRef<any>, data) {
    this.currentSelectedPhoto = data;
    this.dialog.open(templateRef);
  }

  updatePhotoRecord() {
    this.spinnerService.showSpinner();
    this.cockpitPhotoService.UpdateMissionImages(
      this.currentImage2UpdateForm.value,
      this.currentSelectedPhoto.missionPhotoId
    ).subscribe((res: IResponse) => {
      if (res.success) {
        this.alertify.success(res.message);
        this.spinnerService.hideSpinner();
      }
    }, error => this.alertify.error('Mission photo update failed.'));
    this.closeModal();
    this.currentImage2UpdateForm.reset();
  }

  closeModal() {
    this.dialog.closeAll();
  }

  deleteRequestDialogue() {
    this.deleteRequested = !this.deleteRequested;
  }

  deleteSelectedMissionPhoto() {
    this.spinnerService.showSpinner();
    this.cockpitPhotoService.deleteSelectedphoto(this.currentSelectedPhoto.missionPhotoId)
    .subscribe((res: IResponse) => {
      if (res.success) {
        this.alertify.success(res.message);
        this.spinnerService.hideSpinner();
        this.router.navigate(['cockpit/editphotos/', 1]);
        this.ngOnInit();
        this.subscr = this.route.params.subscribe(p => {
          // grab the selected index from the url and pass it to the tab.
          this.tabGroup.selectedIndex = +p['idx'];
        });
      }
    }, error => this.alertify.error('Image was not deleted.'));

    this.closeModal();
  }

  tabchange(evt) {
    switch (evt.index) {
      case 0: this.addPhotoTab = true;
              break;
      case 1: this.editPhotoTab = true;
              break;
    }
  }

}
