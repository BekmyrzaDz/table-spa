import axios from "../../../api/axios.ts";
import {IPost} from "../types/types.ts";

// Get all posts
const getPosts = async ({page, limit}: {page: number, limit: number}): Promise<IPost> => {
  const response = await axios.get(`/posts?_page=${page}&_limit=${limit}`)
  console.log(response)

  return response.data
}

const postsService = {
  getPosts,
}

export default postsService

