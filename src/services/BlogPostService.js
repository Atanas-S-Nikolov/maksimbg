import { BLOG_POST_URL } from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";
import { deleteFile } from "./FileUploadService";
import { STORAGE_BLOG_IMAGES_DIRECTORY } from "@/constants/URLConstants";
import UnauthorizedHandler from "@/utils/UnauthorizedHandler";

export function createPost(post) {
  return new UnauthorizedHandler(() =>
    backendRequest.post(BLOG_POST_URL, JSON.stringify(post))
  );
}

export async function getPost(url) {
  const response = await backendRequest.get(`${BLOG_POST_URL}/${url}`);
  return response.data;
}

export async function getAllPosts() {
  const response = await backendRequest.get(BLOG_POST_URL);
  return response.data;
}

export function updatePost(url, post) {
  return new UnauthorizedHandler(() =>
    backendRequest.put(`${BLOG_POST_URL}/${url}`, JSON.stringify(post))
  );
}

export function deletePost(post) {
  return new UnauthorizedHandler(async () => {
    const { url, images } = post;
    const response = await backendRequest.delete(`${BLOG_POST_URL}/${url}`);
    if (response.status === 200) {
      await deletePostImages(url, images);
      return response.data;
    }
  });
}

export async function deletePostImages(postUrl, images) {
  const postDirectory = `${STORAGE_BLOG_IMAGES_DIRECTORY}${postUrl}`;
  const promises = images.map((image) =>
    deleteFile(`${postDirectory}/${image.fileName}`)
  );
  return await Promise.all(promises);
}
