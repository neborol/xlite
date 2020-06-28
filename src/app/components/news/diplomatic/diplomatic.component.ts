import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NewsService } from 'src/app/services/news.service';
import { INewsArticlesGet } from 'src/app/interfaces/news-article-get.interface';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-diplomatic',
  templateUrl: './diplomatic.component.html',
  styleUrls: ['./diplomatic.component.scss']
})
export class DiplomaticComponent implements OnInit, OnChanges {
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent> = new EventEmitter();
  newsThumbData: INewsArticlesGet[];
  rootUrl: string = environment.rootUrl;
  @Input() diplomaticNewsItems: INewsArticlesGet[];
  currentItem: INewsArticlesGet;

  constructor(private newsService: NewsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.newsService.getNewsArticles('diplomatic').subscribe((articles: INewsArticlesGet[]) => {

      this.newsThumbData = articles.sort((a: any, b: any) => {
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
          case 'diplomaticNewsItems': {
            this.newsThumbData = this.diplomaticNewsItems.map(x => {
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
