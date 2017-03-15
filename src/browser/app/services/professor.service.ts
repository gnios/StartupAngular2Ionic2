import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProfessorService {
    URL_BASE: string = "http://localhost:3000";
    constructor(private http: Http) {
    }

    // Uses http.get() to load a single JSON file
    getProfessor() {
        let res = this.http.get(this.URL_BASE + '/professor').map((res: Response) => res.json());
        return res;
    }
    getProfessorById(id: number) {
        let res = this.http.get(this.URL_BASE + '/professor/'+ id).map((res: Response) => res.json());
        return res;
    }

    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getBooksAndMovies() {
        return Observable.forkJoin(
            this.http.get('/app/books.json').map((res: Response) => res.json()),
            this.http.get('/app/movies.json').map((res: Response) => res.json())
        );
    }

    createProfessor(professor) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(professor);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post(this.URL_BASE + '/professor/', body, options).map((res: Response) => res.json());
    }

    deleteFood(food) {
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.delete(this.URL_BASE + '/api/food/' + food.id);
    }

}