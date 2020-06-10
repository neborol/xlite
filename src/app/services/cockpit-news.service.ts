import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { INewsPost } from '../interfaces/news-post.interface';
import { IScrollNewsPost } from '../interfaces/scroll-news-interface';
import { IArticleUpdate } from '../interfaces/article-update.interface';

@Injectable({
  providedIn: 'root'
})
export class CockpitNewsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addANewsItem(newsItemObj: INewsPost, newsImagePath: string) {
    newsItemObj.imagePath = newsImagePath;
    return this.http.post(this.baseUrl + 'cockpitNews/addANewsItem', newsItemObj);
  }

  addAScrollingNewsItem(scrollingNewsObj: IScrollNewsPost) {
    return this.http.post(this.baseUrl + 'cockpitNews/addScrollingNewsMessage', scrollingNewsObj);
  }


  getAllNewsArticles(category: string) {
    return this.http.get(this.baseUrl + 'cockpitNews/getarticles/' + category);
  }

  updateNewsArticle(newsItemObj: IArticleUpdate) {
    const updateArticle: INewsPost = {
        newsTitle: newsItemObj.editNewsTitle,
        newsSummary: newsItemObj.editNewsSummary,
        newsFullStory: newsItemObj.editNewsFullStory,
        newsCategory: newsItemObj.editNewsCategory,
        imagePath: !!newsItemObj.editImagePath ? newsItemObj.editImagePath : ''
    };
    const newsId = newsItemObj.newsId;
    return this.http.put(this.baseUrl + 'cockpitNews/updateNewsArticle/' + newsId, updateArticle);
  }

//   deleteAnFaq(id: number) {
//     return this.http.delete(this.baseUrl + 'CockpitFaq/deletefaq/' + id);
//   }

}
