import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() videoId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  userLoggedIn = false;

  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.inputName = this.videoId + '_rating';
    if (this.authService.isLoggedIn()) {
      this.userLoggedIn = true;
    }
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      videoId: this.videoId,
      rating
    });
  }

  mustbeLoggedInFirstResponse() {
    this.alertify.warning('You must be logged-in first!');
  }
}
