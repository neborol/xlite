import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFaqPost } from '../interfaces/faq-post.interface';
import { IFaqGet } from '../interfaces/faqs-get.interface';
import { IFaqEdit } from '../interfaces/faq-edit.interface';

@Injectable({
  providedIn: 'root'
})
export class CockpitFaqService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addAnFaq(faqObj: IFaqPost) {
    return this.http.post(this.baseUrl + 'CockpitFaq/addfaq', faqObj);
  }

  editAnFaq(faqObj: IFaqEdit, id: number) {
    const faqAddObject: IFaqGet = {
      faqId: id,
      faqQuestion: faqObj.editQuestion,
      faqAnswer: faqObj.editAnswer
    };
    console.log('Tessing', faqAddObject);
    return this.http.put(this.baseUrl + 'CockpitFaq/editfaq', faqAddObject);
  }

  deleteAnFaq(id: number) {
    return this.http.delete(this.baseUrl + 'CockpitFaq/deletefaq/' + id);
  }

}
