import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getPost() {
    return this.http.get(this.baseUrl);
  }
}
