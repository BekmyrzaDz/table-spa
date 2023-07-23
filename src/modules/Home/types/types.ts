// Slices types
export interface IPostsState {
  posts: IPost[] | []
  filteredPosts: IPost[] | []
  isSorted: boolean
  isLoading: boolean
  isError: boolean
}

export interface IPost {
  body: string
  id: number
  title: string
  userId: number
}

// Actions types
export interface IParams {
  page: number
  limit: number
}

// Component types
export interface IColumns {
  field: string
  headerName: string
}