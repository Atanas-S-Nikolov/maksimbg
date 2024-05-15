import { BLOG_POST_URL } from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";
import { handleUnauthorized } from "@/utils/ApiUtils";
import { deleteFile } from "./FileUploadService";
import { STORAGE_BLOG_IMAGES_DIRECTORY } from "@/constants/URLConstants";

export async function createPost(post) {
  try {
    const response = await backendRequest.post(
      BLOG_POST_URL,
      JSON.stringify(post)
    );
    return response?.data;
  } catch (error) {
    handleUnauthorized(error);
  }
}

export async function getPost(url) {
  const response = await backendRequest.get(`${BLOG_POST_URL}/${url}`);
  return response.data;
}

export async function getAllPosts() {
  const response = await backendRequest.get(BLOG_POST_URL);
  return response.data;
}

export async function updatePost(url, post) {
  try {
    const response = await backendRequest.put(
      `${BLOG_POST_URL}/${url}`,
      JSON.stringify(post)
    );
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
  }
}

export async function deletePost(post) {
  const { url, image } = post;
  try {
    const response = await backendRequest.delete(`${BLOG_POST_URL}/${url}`);
    if (response.status === 200) {
      await deleteFile(
        `${STORAGE_BLOG_IMAGES_DIRECTORY}${url}/${image.fileName}`
      );
      return response.data;
    }
  } catch (error) {
    handleUnauthorized(error);
  }
}
