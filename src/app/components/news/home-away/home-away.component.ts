import { Component, OnInit, SimpleChanges, OnChanges, Input, TemplateRef} from '@angular/core';
import { INewsArticlesGet } from 'src/app/interfaces/news-article-get.interface';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';


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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
