import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVideo } from '../../interfaces/video-get.interface';



@Injectable({
    providedIn: 'root'
})

export class VideoService {

    private dataURL = 'assets/movies.json';

    constructor(private http: HttpClient) {}

    getJSON(): Observable<IVideo[]> {
        return this.http.get<IVideo[]>(this.dataURL);
    }
}
