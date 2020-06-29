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
  hidden = false;

  constructor(private faqService: FaqService) { }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  ngOnInit() {
    this.faqService.getFaqs().subscribe((faqList: IFaqGet[]) => {
      this.listOfFaqs = faqList;
    });
  }


}
