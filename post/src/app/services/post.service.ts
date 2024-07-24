import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePost, UpdatePost } from '../models/post.interface';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getPost(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createPost(payload: CreatePost): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  updatePost(payload: UpdatePost): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
}
