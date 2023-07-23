export interface IPostsState {
  posts: IPost[] | []
  isLoading: boolean
  isError: boolean
  toSorted: boolean
}

export interface IPost {
  body: string
  id: number
  title: string
  userId: number
}

export interface IColumns {
  field: string
  headerName: string
}

export interface IParams {
  page: number
  limit: number
}