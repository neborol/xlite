import { Component, OnInit, TemplateRef, ViewChild, Renderer2 } from '@angular/core';
import { IVideo } from 'src/app/interfaces/video-get.interface';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { MatVideoComponent } from 'mat-video/lib/video.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  pageTitle = 'Video List';
  private dataURL = 'assets/videos.json';
  videoData: IVideo[] = [];
  currentVideoItem: IVideo;

  @ViewChild('eliteVideo', {static: false}) matVideo: MatVideoComponent;
  videoElement: HTMLVideoElement;

  constructor(private http: HttpClient, public dialog: MatDialog, private renderer: Renderer2) { }

  // ngOnInit() {
  //   this.movieService.getJSON().subscribe((data: IMovie[]) => {
  //     console.log('testingData', data);

  //   });
  // }

  ngOnInit() {
    this.http.get<IVideo[]>(this.dataURL).subscribe((data: IVideo[]) => {
      this.videoData = data;
      this.videoElement = this.matVideo.getVideoTag();

      // Use Angular renderer or addEventListener to listen for standard HTML5 video events
      this.renderer.listen(this.videoElement, 'ended', () => console.log('video ended'));
      this.videoElement.addEventListener('ended', () => console.log('video ended'));
    });
  }

  playVideo(templateRef: TemplateRef<any>, videoObj) {
    this.currentVideoItem = videoObj;

    // Now open the modal dialog and pass to it the templateRef, and this templateRef would need dislay data, which
    //       should be provided by the "this.currentVideoItem".
    this.dialog.open(templateRef);
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
