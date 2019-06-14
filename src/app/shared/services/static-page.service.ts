import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import StaticPage from '../classes/static-page';

@Injectable()
export class StaticPageService {

    constructor(private http: HttpClient) { }

    get(slug: string) {
      return this.http.get('http://185.22.64.192:8000/api/v1/static-page/' + slug + '/');
    }

    list() {
      return this.http.get('http://185.22.64.192:8000/api/v1/static-page/');
    }

    post(body) {
        return this.http.post('http://185.22.64.192:8000/api/v1/static-page/', body);
    }

    update(slug: string, body: StaticPage) {
        return this.http.put('http://185.22.64.192:8000/api/v1/static-page/' + slug + '/', body);
    }

    delete(id: string) {
        return this.http.delete('http://185.22.64.192:8000/api/v1/static-page/' + id + '/');
    }
}
