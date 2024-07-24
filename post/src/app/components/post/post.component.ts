import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import Swal from 'sweetalert2';
import { ListPost } from '../../models/post.interface';
import { PostService } from '../../services/post.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

interface ColumnItem {
  name: string;
  key: string;
  left: boolean;
  right: boolean;
  width: string;
  compare?: any;
  priority?: boolean;
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NzTableModule,

    NzButtonModule,
    NzIconModule,
    NzPaginationModule,
    NzSpinModule,
    NzIconModule,
    NzToolTipModule,
    NzModalModule,
    NzBreadCrumbModule,
    RouterModule,
  ],
  providers: [PostService, NzModalService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  isFetchPostLoading: boolean;
  isUpdatePostLoading: boolean;
  isCreatePostLoading: boolean;
  isDeletePostLoading: boolean;

  tableData: ListPost[] = [];
  totalData = 0;
  pageSize = 5;
  pageIndex = 1;

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
      width: '100px',
    },
  ];

  deleteModal?: NzModalRef;

  constructor(
    private postService: PostService,

    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.isFetchPostLoading = false;
    this.isUpdatePostLoading = false;
    this.isCreatePostLoading = false;
    this.isDeletePostLoading = false;
  }

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost() {
    this.isFetchPostLoading = true;
    this.postService.getPost().subscribe(
      (r: ListPost[]) => {
        this.isFetchPostLoading = false;
        this.tableData = r;
      },
      (err) => {
        this.isFetchPostLoading = false;
        console.error(err);
        Toast.fire({
          icon: 'error',
          title: 'Error while fetching post data',
        });
      }
    );
  }

  deletePost(postId: number): void {
    this.deleteModal = this.modal.confirm({
      nzTitle: 'Delete Post',
      nzContent: '<b style="color: red;">Are you sure delete this post?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.postService.deletePost(postId).subscribe(
          () => {
            Toast.fire({ icon: 'success', title: 'Post deleted' });
          },
          (err) => {
            console.error(err);
            Toast.fire({ title: 'Failed to delete post', icon: 'error' });
          }
        ),

      nzCancelText: 'No',
    });
  }

  openModal(action: string, data?: ListPost) {
    const modal = this.modal.create({
      nzContent: ModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzTitle: action === 'add' ? 'Create Post' : 'Edit Post',
      // nzMaskClosable: false,
      nzClosable: false,

      nzData: { action, post: data },
    });
    modal.afterClose.subscribe((r) => {
      console.log(r);
      if (r === 'success') {
        Toast.fire({
          icon: 'success',
          title: action === 'add' ? 'Post Created' : `Post ${data?.id} Updated`,
        });
      } else if (r === 'error') {
        Toast.fire({
          icon: 'error',
          title:
            action === 'add'
              ? 'Create Post Failed'
              : `Update Post ${data?.id} Failed`,
        });
      }
      this.fetchPost();
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    // console.log(params)
    const { pageSize, pageIndex, sort } = params;
    this.pageSize = pageSize;
  }
}
