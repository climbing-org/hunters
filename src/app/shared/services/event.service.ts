import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

    get(slug: string) {
        return this.http.get('http://185.22.64.192:8000/api/v1/events/' + slug + '/');
    }

    list() {
        return this.http.get('http://185.22.64.192:8000/api/v1/events/');
    }

    post(body) {
        return this.http.post('http://185.22.64.192:8000/api/v1/events/', body);
    }

    update(slug: string, body: any) {
        return this.http.put('http://185.22.64.192:8000/api/v1/events/' + slug + '/', body);
    }

    delete(id: string) {
        return this.http.delete('http://185.22.64.192:8000/api/v1/events/' + id + '/');
    }
}
