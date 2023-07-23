import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IPost, IPostsState} from '../types/types.ts'
import {
  getPosts
} from './asyncActions'

const initialState: IPostsState = {
  posts: [],
  isLoading: false,
  isError: false,
  toSorted: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsSortById: (state): void => {
      if (state.toSorted) {
        state.posts = state.posts.sort((a, b) => a.id - b.id)
        state.toSorted = false
      } else {
        state.posts = state.posts.sort((a, b) =>  b.id - a.id)
        state.toSorted = true
      }
    },
    postsSortByTitleAndDescription: (state): void => {
      if (state.toSorted) {
        state.posts = state.posts.sort((a, b) => a.title.localeCompare(b.title))
        state.toSorted = false
      } else {
        state.posts = state.posts.sort((a, b) => b.title.localeCompare(a.title))
        state.toSorted = true
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
        }
      )
      .addCase(getPosts.rejected, (state: IPostsState): void => {
        state.isLoading = false
        state.isError = true
        state.posts = []
      })
  },
})

export const {postsSortById, postsSortByTitleAndDescription} = postsSlice.actions
export default postsSlice.reducer
