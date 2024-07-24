export interface CreatePost {
  userId: number
  title: string
  completed: boolean
}

export interface UpdatePost {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface ListPost {
  userId: number
  id: number
  title: string
  body: string
}