import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser } from '../interfaces/User-creation.interface';
import { Subject } from 'rxjs';
import { Claim } from '../components/generic-modal/generic-modal.component';
import { IFaqGet } from '../interfaces/faqs-get.interface';
import { INewsArticlesGet } from '../interfaces/news-article-get.interface';


@Injectable({
  providedIn: 'root'
})

export class NewsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNewsArticles(category: string) {
    return this.http.get<INewsArticlesGet[]>(this.baseUrl + 'News/getArticles/' + category);
  }

  getNewsFlash() {
    return this.http.get(this.baseUrl + 'news/getnewsflash');
  }

//   editAnFaq(obj) {
//     return this.http.put<IFaqGet>(this.baseUrl + 'CockpitFaq/getfaqs', obj);
//   }

}
