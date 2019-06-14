import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../classes/user';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

    get(id: number) {
        return this.http.get('http://185.22.64.192:8000/api/v1/users/' + id + '/');
    }

    getMyProfile() {
        return this.http.get('http://185.22.64.192:8000/api/v1/users/me/');
    }

    list(role?: string) {
        let url = 'http://185.22.64.192:8000/api/v1/users/';
        if (role) { url += `?role=${role}`; }
        return this.http.get(url);
    }

    post(body) {
        return this.http.post('http://185.22.64.192:8000/api/v1/users/', body);
    }

    update(id: number, body: User) {
        return this.http.put('http://185.22.64.192:8000/api/v1/users/' + id + '/', body);
    }

    partial_update(id: number, body: any) {
        return this.http.patch('http://185.22.64.192:8000/api/v1/users/' + id + '/', body);
    }

    change_password(id: number, oldPassword: string, newPassword: string) {
        const body = {
            old_password: oldPassword,
            new_password: newPassword
        };
        return this.http.post('http://185.22.64.192:8000/api/v1/users/' + id + '/change_password/', body);
    }

    set_password(id: number, newPassword: string) {
      const body = {
          password: newPassword
      };
        return this.http.post('http://185.22.64.192:8000/api/v1/users/' + id + '/set_password/', body);
    }

    delete(id: number) {
        return this.http.delete('http://185.22.64.192:8000/api/v1/users/' + id + '/');
    }
}
