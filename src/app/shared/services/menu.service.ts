import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  get(id: string) {
    return this.http.get('https://androidios.kz:8000/api/v1/menu/' + id + '/');
  }

    list() {
        return this.http.get('https://androidios.kz:8000/api/v1/menu/');
    }

    post(body) {
        return this.http.post('https://androidios.kz:8000/api/v1/menu/', body);
    }

    update(id: string, body) {
        return this.http.put('https://androidios.kz:8000/api/v1/menu/' + id + '/', body);
    }

    delete(id: number) {
        return this.http.delete('https://androidios.kz:8000/api/v1/menu/' + id + '/');
    }
}
