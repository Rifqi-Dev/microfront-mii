import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PostService } from '../services/post.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent, HttpClientModule],

  selector: 'app-post-entry',
  template: `<app-nx-welcome></app-nx-welcome>`,
  providers: [PostService],
})
export class RemoteEntryComponent {
  constructor(private postService: PostService) {
    postService.getPost().subscribe((r) => {
      console.log(r);
    });
  }
}
