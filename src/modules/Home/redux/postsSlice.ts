import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IPost, IPostsState} from '../types/types.ts'
import {
  getPosts
} from './asyncActions'

const initialState: IPostsState = {
  posts: [],
  filteredPosts: [],
  isSorted: false,
  isLoading: false,
  isError: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsSortById: (state): void => {
      if (state.isSorted) {
        state.filteredPosts = state.posts.sort((a, b) => a.id - b.id)
        state.isSorted = false
      } else {
        state.filteredPosts = state.posts.sort((a, b) => b.id - a.id)
        state.isSorted = true
      }
    },
    postsSortByTitleAndDescription: (state): void => {
      if (state.isSorted) {
        state.filteredPosts = state.posts.sort((a, b) => a.title.localeCompare(b.title))
        state.isSorted = false
      } else {
        state.filteredPosts = state.posts.sort((a, b) => b.title.localeCompare(a.title))
        state.isSorted = true
      }
    },
    postsSearch: (state, action: PayloadAction<string>): IPostsState => {
      return {
        ...state,
        filteredPosts: [...state.posts]
          .filter(post =>
            post.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            post.body.toLowerCase().includes(action.payload.toLowerCase()) ||
            post.id.toString().includes(action.payload.toString()))
      }
    },
  },
  extraReducers: (builder): void => {
    builder
      .addCase(getPosts.pending, (state: IPostsState): void => {
        state.isLoading = true
      })
      .addCase(
        getPosts.fulfilled,
        (state: IPostsState, action: PayloadAction<IPost[]>): void => {
          state.isLoading = false
          state.posts = action.payload
          state.filteredPosts = [...state.posts]
        }
      )
      .addCase(getPosts.rejected, (state: IPostsState): void => {
        state.isLoading = false
        state.isError = true
        state.posts = []
      })
  },
})

export const {postsSortById, postsSortByTitleAndDescription, postsSearch} = postsSlice.actions
export default postsSlice.reducer
