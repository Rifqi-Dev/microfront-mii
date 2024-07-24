import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PostComponent } from '../components/post/post.component';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent, PostComponent],

  selector: 'app-post-entry',
  template: `<app-post></app-post>`,
})
export class RemoteEntryComponent {}
