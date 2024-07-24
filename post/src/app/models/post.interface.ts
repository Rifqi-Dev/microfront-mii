export interface CreatePost {
  userId: number;
  title: string;
  body: boolean;
}

export interface UpdatePost {
  userId: number;
  id: number;
  title: string;
  body: boolean;
}

export interface ListPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
