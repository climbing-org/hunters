import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsService {

    constructor(private http: HttpClient) { }

    get(slug: string) {
      return this.http.get('http://185.22.64.192:8000/api/v1/news/' + slug + '/');
    }

    list() {
      return this.http.get('http://185.22.64.192:8000/api/v1/news/');
    }

    post(body) {
        return this.http.post('http://185.22.64.192:8000/api/v1/news/', body);
    }

    update(slug: string, body) {
        return this.http.put('http://185.22.64.192:8000/api/v1/news/' + slug + '/', body);
    }

    delete(id: string) {
        return this.http.delete('http://185.22.64.192:8000/api/v1/news/' + id + '/');
    }
}
