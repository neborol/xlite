import { Component, OnInit } from '@angular/core';
import { FaqService } from './../../services/faq.service';
import { IFaqGet } from './../../interfaces/faqs-get.interface';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  listOfFaqs: IFaqGet[];

  constructor(private faqService: FaqService) { }

  ngOnInit() {
    this.faqService.getFaqs().subscribe((faqList: IFaqGet[]) => {
      this.listOfFaqs = faqList;
    });
  }


}
