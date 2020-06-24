import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVideoGet } from '../../interfaces/video-get.interface';



@Injectable({
    providedIn: 'root'
})

export class VideoService {

    private dataURL = 'assets/movies.json';

    constructor(private http: HttpClient) {}

    getJSON(): Observable<IVideoGet[]> {
        return this.http.get<IVideoGet[]>(this.dataURL);
    }
}
