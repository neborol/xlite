import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { INewsArticlesGet } from 'src/app/interfaces/news-article-get.interface';
import { SpinnerService } from 'src/app/services/spinner.service';

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

  diplomatic = true;
  homeAway = false;
  general = false;

  constructor(private newsService: NewsService, private spinnerService: SpinnerService) { }

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
        this.spinnerService.showSpinner();
        this.diplomatic = true;
        if (this.diplomaticArray.length === 0) {
          this.newsService.getNewsArticles('diplomatic').subscribe((diplomaticItems: INewsArticlesGet[]) => {
            this.diplomaticArray = diplomaticItems;
            this.spinnerService.hideSpinner();
          }, error => {
            this.spinnerService.hideSpinner();
          });
        }
        break;

      case 1:
        this.spinnerService.showSpinner();
        this.homeAway = true;
        if (this.homeAwayArray.length === 0) {
          this.newsService.getNewsArticles('home-away').subscribe((homeAwayItems: INewsArticlesGet[]) => {
            this.homeAwayArray = homeAwayItems;
            this.spinnerService.hideSpinner();
          });
        }
        break;

      case 2:
        this.spinnerService.showSpinner();
        this.general = true;
        if (this.generalArray.length === 0) {
          this.newsService.getNewsArticles('general').subscribe((generalItems: INewsArticlesGet[]) => {
            this.generalArray = generalItems;
            this.spinnerService.hideSpinner();
          });
        }
        break;

    }
  }

}
