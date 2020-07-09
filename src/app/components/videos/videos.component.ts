import { Component, OnInit, TemplateRef, ViewChild, Renderer2 } from '@angular/core';
import { IVideoGet } from 'src/app/interfaces/video-get.interface';
import { MatDialog } from '@angular/material';
import { MatVideoComponent } from 'mat-video/lib/video.component';
import { VideosService } from './../../services/videos.service';
import { environment } from 'src/environments/environment';
import { IRatingsObjectPost } from 'src/app/interfaces/video-rating.interface';
import { AuthService } from 'src/app/services/auth.service';
import { IResponse } from 'src/app/interfaces/response.interface';
import { AlertifyService } from './../../services/alertify.service';
import { SpinnerService } from './../../services/spinner.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  pageTitle = 'Video List';
  serverUrl = environment.serverUrl;
  videoData: IVideoGet[] = [];
  currentVideoItem: IVideoGet;

  ratingsObj: IRatingsObjectPost = {
    videoId: 0,
    rating: 0
  };

  @ViewChild('eliteVideo', {static: false}) matVideo: MatVideoComponent;
  videoElement: HTMLVideoElement;
  userLoggedIn = false;

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private videosService: VideosService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private spinnerService: SpinnerService
  ) { }

  // ngOnInit() {
  //   this.movieService.getJSON().subscribe((data: IMovie[]) => {
  //     console.log('testingData', data);

  //   });
  // }

  ngOnInit() {
    this.spinnerService.showSpinner();
    this.videosService.getVideos().subscribe((videos: IVideoGet[]) => {
      this.videoData = videos.sort((a: any, b: any) => {
        return (new Date(b.dateCreated) as any) - (new Date(a.dateCreated) as any);
      }).map(vid => {
        vid.posterPath = this.serverUrl + vid.posterPath;
        vid.videoPath = this.serverUrl + vid.videoPath;
        return vid;
      });

      this.spinnerService.hideSpinner();

      // this.videoElement = this.matVideo.getVideoTag();
      if (this.authService.isLoggedIn()) {
        this.userLoggedIn = true;
      }
    });
  }

  playVideo(templateRef: TemplateRef<any>, videoObj) {
    this.currentVideoItem = videoObj;

    // Now open the modal dialog and pass to it the templateRef, and this templateRef would need dislay data, which
    //       should be provided by the "this.currentVideoItem".
    this.dialog.open(templateRef);
  }

  ratingComponentClick(evt) {
    this.ratingsObj.videoId = evt.videoId;
    this.ratingsObj.rating = evt.rating;
  }

  submitRating(val) {
    this.spinnerService.showSpinner();
    if (val === 0) { }
    this.videosService.postVideoRating(this.ratingsObj).subscribe((resp: IResponse) => {
      if (resp.success) {
        this.alertify.success(resp.message);
        this.spinnerService.hideSpinner();
      }
    }, error => { this.alertify.error(error.message); });
  }

  unRate(video) {
    video.rating = 0;
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
