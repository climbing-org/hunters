import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RubricService {

    constructor(private http: HttpClient) { }

    get(slug: string) {
      return this.http.get('http://185.22.64.192:8000/api/v1/rubric/' + slug + '/');
    }

    list() {
      return this.http.get('http://185.22.64.192:8000/api/v1/rubric/');
    }

    post(body) {
        return this.http.post('http://185.22.64.192:8000/api/v1/rubric/', body);
    }

    update(slug: string, body) {
        return this.http.put('http://185.22.64.192:8000/api/v1/rubric/' + slug + '/', body);
    }

    partial_update(id: number, body: any) {
        return this.http.patch('http://185.22.64.192:8000/api/v1/rubric/' + id + '/', body);
    }

    delete(id: string) {
        return this.http.delete('http://185.22.64.192:8000/api/v1/rubric/' + id + '/');
    }
}
