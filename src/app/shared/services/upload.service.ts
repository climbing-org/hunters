import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  post(file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const headers = new HttpHeaders();
      headers.set('Accept', 'application/json');

      return this.http.post( 'http://185.22.64.192:8000/api/v1/tinymce-upload/', formData, { headers: headers });
  }
}
