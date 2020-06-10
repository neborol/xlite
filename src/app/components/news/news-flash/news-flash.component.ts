import { Component, OnInit, Input } from '@angular/core';
import { timer, from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-flash',
  templateUrl: './news-flash.component.html',
  styleUrls: ['./news-flash.component.scss']
})
export class NewsFlashComponent implements OnInit {
  newsFlash: string;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getNewsFlash().subscribe((data: {success: boolean, message: string}) => {
      this.newsFlash = data.message;
    });
  }

}
