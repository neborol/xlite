import { Component, OnInit, SimpleChanges, OnChanges, Input, TemplateRef} from '@angular/core';
import { INewsArticlesGet } from 'src/app/interfaces/news-article-get.interface';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { NewsService } from 'src/app/services/news.service';


@Component({
  selector: 'app-home-away',
  templateUrl: './home-away.component.html',
  styleUrls: ['./home-away.component.scss']
})
export class HomeAwayComponent implements OnInit, OnChanges {
  @Input() homeAwayNewsItems: INewsArticlesGet[];
  homeAwayArray: INewsArticlesGet[] = [];
  rootUrl: string = environment.rootUrl;
  currentItem: INewsArticlesGet;

  constructor(public dialog: MatDialog, private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNewsArticles('home-away').subscribe((articles: INewsArticlesGet[]) => {

      this.homeAwayNewsItems = articles.sort((a: any, b: any) => {
        return (new Date(b.datePublished) as any) - (new Date(a.datePublished) as any);
      }).map(x => {
        x.imagePath = this.rootUrl + x.imagePath.split('\\').join('/');
        return x;
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'homeAwayNewsItems': {
            this.homeAwayArray = this.homeAwayNewsItems.map(x => {
              x.imagePath = this.rootUrl + x.imagePath.split('\\').join('/');
              return x;
            });
          }
        }
      }
    }
  }

  displayModal(templateRef: TemplateRef<any>, currentData) {
    this.currentItem = currentData; // Send the current item to be stored in a local variable and use inside the modal template.
    this.dialog.open(templateRef);
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
