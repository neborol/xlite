import { Component, OnInit, OnChanges, SimpleChanges, Input, TemplateRef } from '@angular/core';
import { INewsArticlesGet } from 'src/app/interfaces/news-article-get.interface';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnChanges {
  @Input() generalNewsItems: INewsArticlesGet[];
  generalItemsArray: INewsArticlesGet[] = [];
  rootUrl: string = environment.rootUrl;
  currentItem: INewsArticlesGet;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'generalNewsItems': {
            this.generalItemsArray = this.generalNewsItems.map(x => {
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
