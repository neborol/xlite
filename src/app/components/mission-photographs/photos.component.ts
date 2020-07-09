import { Component, OnInit, ElementRef } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Router } from '@angular/router';
import { ILazyImage } from '../../interfaces/lazy-image.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-missionphotos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class Jan052019Component implements OnInit {
  // missionPhotos: ILazyImage[] = [];
  missionPhotos: any[] = [];
  missionPhotoSources: any[] = [];
  totalImages: number;
  rootUrl: string = environment.rootUrl;

  constructor(private imgService: ImagesService, private router: Router) {
  }

  // ngOnInit() {
  //   const protestSrcJan052019 = this.imgService.protestSourcesJan052019;
  //   this.imgService.setAnimation(protestSrcJan052019, this.missionPhotos);
  //   this.totalImages = protestSrcJan052019.length;
  // }

  ngOnInit() {
    this.imgService.getMissionImages().subscribe((res: any[]) => {
      this.missionPhotoSources = res.map(ph => {
        ph.uniquePhotoName = this.rootUrl + ph.uniquePhotoName;
        return ph;
      });

      this.imgService.setAnimation(this.missionPhotoSources, this.missionPhotos);
      this.totalImages = this.missionPhotoSources.length;

    });


  }



  get totalImagesShown(): number {
    return (this.missionPhotos.filter(imageItem => imageItem.show) || []).length;
  }

}
