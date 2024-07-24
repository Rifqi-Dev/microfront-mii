/* eslint-disable no-var */
/* eslint-disable no-case-declarations */
import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CreatePost,
  ListPost,
  UpdatePost,
} from '../../../models/post.interface';
import {
  NZ_MODAL_DATA,
  NzModalModule,
  NzModalRef,
  NzModalService,
} from 'ng-zorro-antd/modal';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../..//services/post.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    NzIconModule,
  ],
  providers: [PostService, NzModalService],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  postForm: FormGroup;
  loading!: boolean;
  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private postService: PostService,
    @Inject(NZ_MODAL_DATA) public data: { action: string; post: ListPost }
  ) {
    this.postForm = fb.group({
      id: [this.data.post ? this.data.post.id : null],
      userId: [
        this.data.post ? this.data.post.userId : null,
        Validators.compose([Validators.required]),
      ],
      title: [
        this.data.post ? this.data.post.title : null,
        Validators.compose([Validators.required]),
      ],
      body: [
        this.data.post ? this.data.post.body : null,
        Validators.compose([Validators.required]),
      ],
    });

    // console.log(this.postForm);
  }

  submit() {
    switch (this.data.action) {
      case 'edit':
        const payloaEdit: UpdatePost = {
          userId: this.postForm.value.userId,
          id: this.postForm.value.id,
          title: this.postForm.value.title,
          body: this.postForm.value.body,
        };
        this.loading = true;
        this.postService.updatePost(payloaEdit).subscribe(
          () => {
            this.modal.close('success');
          },
          () => {
            this.modal.close('error');
          }
        );
        break;

      case 'add':
        const payloadCreate: CreatePost = {
          userId: this.postForm.value.userId,
          title: this.postForm.value.title,
          body: this.postForm.value.body,
        };
        this.loading = true;
        this.postService.createPost(payloadCreate).subscribe(
          () => {
            this.modal.close('success');
          },
          () => {
            this.modal.close('error');
          }
        );
        break;
    }
  }
  closeModal(): void {
    this.modal.close();
  }
}
