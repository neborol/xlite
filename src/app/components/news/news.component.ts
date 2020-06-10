import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { INewsArticlesGet } from 'src/app/interfaces/news-article-get.interface';

export interface TabDescr {
  title: string;
  features: string[];
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  tabIndex = 0;
  tabDescriptionObject: TabDescr[];
  diplomaticArray: INewsArticlesGet[] = [];
  homeAwayArray: INewsArticlesGet[] = [];
  generalArray: INewsArticlesGet[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.tabDescriptionObject = [
      {
        title: 'Diplomatic News Items constitute:',
        features: [
          'General happenings in and around Southern Cameroons.',
          'Things of Southern Cameroons interests that don\'t fall under the other categories.'
        ]
      },
      {
        title: 'HomeAway News items constitue:',
        features: [
          'The IDPs(Internally Displaced Persons) & Refugees',
          'Our loved ones locked up in the prisons for committing no crime'
        ]
      },
      {
        title: 'General News Items constitue:',
        features: [
          'News Items that don\'t fall under the other Categories',
          'General Revolution Concerns, and foreign news from our neighboring country'
        ]
      }

    ];
  }

  tabchange(evt) {
    this.tabIndex = evt.index;
    switch (evt.index) {
      case 0:
        if (this.diplomaticArray.length === 0) {
          this.newsService.getNewsArticles('diplomatic').subscribe((diplomaticItems: INewsArticlesGet[]) => {
            this.diplomaticArray = diplomaticItems;
          });
        }
        break;

      case 1:
        if (this.homeAwayArray.length === 0) {
          this.newsService.getNewsArticles('home-away').subscribe((homeAwayItems: INewsArticlesGet[]) => {
            this.homeAwayArray = homeAwayItems;
          });
        }
        break;

      case 2:
        if (this.generalArray.length === 0) {
          this.newsService.getNewsArticles('general').subscribe((generalItems: INewsArticlesGet[]) => {
            this.generalArray = generalItems;
          });
        }
        break;

    }
  }

}
