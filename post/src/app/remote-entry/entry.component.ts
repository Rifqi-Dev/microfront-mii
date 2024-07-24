import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PostService } from '../services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { ListPost } from '../models/post.interface';
import Swal from 'sweetalert2'
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface ColumnItem {
  name: string
  key: string
  left: boolean
  right: boolean
  width: string
  compare?: any
  priority?: boolean
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent, HttpClientModule, NzTableModule, ReactiveFormsModule],

  selector: 'app-post-entry',
  template: `<app-nx-welcome></app-nx-welcome>`,
  providers: [PostService],
})
export class RemoteEntryComponent implements OnInit {

  isFetchPostLoading: boolean
  isUpdatePostLoading: boolean
  isCreatePostLoading: boolean
  isDeletePostLoading: boolean

  tableData: ListPost[] = []

  listOfColumns: ColumnItem[] = [
    {
      name: 'Id',
      key: 'id',
      left: false,
      right: false,
      width: '230px',
      compare: (a: ListPost, b: ListPost) => a.id - b.id,
      priority: false,
    },
    {
      name: 'User Id',
      key: 'user_id',
      left: false,
      right: false,
      width: '230px',
      compare: (a: ListPost, b: ListPost) => a.userId - b.userId,
      priority: false,
    },
    {
      name: 'Title',
      key: 'title',
      left: false,
      right: false,
      width: '230px',
      compare: (a: ListPost, b: ListPost) => a.title.localeCompare(b.title),
      priority: false,
    },
    {
      name: 'Body',
      key: 'body',
      left: false,
      right: false,
      width: '230px',
      compare: (a: ListPost, b: ListPost) => a.body.localeCompare(b.body),
      priority: false,
    },
    {
      name: 'Action',
      key: 'action',
      left: false,
      right: false,
      width: "100px",
    },
  ]

  createPostForm: FormGroup
  updatePostForm: FormGroup

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.isFetchPostLoading = false
    this.isUpdatePostLoading = false
    this.isCreatePostLoading = false
    this.isDeletePostLoading = false

    this.createPostForm = fb.group({
      userId: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      body: [null, Validators.compose([Validators.required])],
    })

    this.updatePostForm = fb.group({
      userId: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      body: [null, Validators.compose([Validators.required])],
    })

  }

  ngOnInit(): void {
    this.fetchPost()
  }

  fetchPost() {
    this.isFetchPostLoading = true
    this.postService.getPost().subscribe((r: ListPost[]) => {
      this.isFetchPostLoading = false
      this.tableData = r

    },
      err => {
        this.isFetchPostLoading = false
        console.error(err)
        Toast.fire({
          icon: 'error',
          title: 'Error while fetching post data'
        })
      });
  }
}
