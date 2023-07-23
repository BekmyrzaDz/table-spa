// Get all students on study
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import { toast } from 'react-toastify'
import postsService from "../services/posts.ts";
import {IPost, IParams} from "../types/types.ts";

// Get all posts
export const getPosts = createAsyncThunk<
  IPost[],
  IParams,
  { rejectValue: string }
>(
  'posts/getPosts',
  async ({page, limit}, {rejectWithValue}) => {
    try {
      const response: IPost[] = await postsService.getPosts({page, limit})

      return response
    } catch (error: unknown) {
      console.log('error', error)
      if (typeof error === 'string') {
        toast.error(error)
        return rejectWithValue(error)
      }
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.detail ||
          (error.response &&
            error.response?.data &&
            error.response?.data?.message) ||
          error.message ||
          error.toString()
        toast.error(message)
        return rejectWithValue(message)
      }
      throw error
    }
  }
)
