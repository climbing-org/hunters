import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import StaticPage from '../classes/static-page';

@Injectable()
export class StaticPageService {

    constructor(private http: HttpClient) { }

    get(slug: string) {
      return this.http.get('https://androidios.kz:8000/api/v1/static-page/' + slug + '/');
    }

    list() {
      return this.http.get('https://androidios.kz:8000/api/v1/static-page/');
    }

    post(body) {
        return this.http.post('https://androidios.kz:8000/api/v1/static-page/', body);
    }

    update(slug: string, body: StaticPage) {
        return this.http.put('https://androidios.kz:8000/api/v1/static-page/' + slug + '/', body);
    }

    delete(id: string) {
        return this.http.delete('https://androidios.kz:8000/api/v1/static-page/' + id + '/');
    }
}
