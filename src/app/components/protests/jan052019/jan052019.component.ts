import { Component, OnInit, ElementRef } from '@angular/core';
import { ImagesService } from '../../../services/images.service';
import { Router } from '@angular/router';
import { ILazyImage } from '../../../interfaces/lazy-image.interface';


@Component({
  selector: 'app-jan052019',
  templateUrl: './jan052019.component.html',
  styleUrls: ['./jan052019.component.scss']
})
export class Jan052019Component implements OnInit {
  protestListJan052019: ILazyImage[] = [];
  totalImages: number;

  constructor(private imgService: ImagesService, private router: Router) {
  }

  ngOnInit() {
    const protestSrcJan052019 = this.imgService.protestSourcesJan052019;
    this.imgService.setAnimation(protestSrcJan052019, this.protestListJan052019);
    this.totalImages = protestSrcJan052019.length;
  }
  get totalImagesShown(): number {
    return (this.protestListJan052019.filter(imageItem => imageItem.show) || []).length;
  }

}
