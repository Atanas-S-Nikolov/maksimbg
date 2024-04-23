import { DEFAULT_DATE_FORMAT } from "@/constants/DateConstants";
import { BLOG_POST_URL } from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";
import { executeAuthenticatedRequest } from "@/utils/ApiUtils";
import { deleteFile } from "./FileUploadService";
import dayjs from "dayjs";

const IMAGES_DIRECTORY = "images";

export async function createPost(post) {
  const response = await executeAuthenticatedRequest(() =>
    backendRequest.post(BLOG_POST_URL, JSON.stringify(post))
  );
  return response?.data;
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
  const updatedOn = dayjs().format(DEFAULT_DATE_FORMAT);
  const postToUpdate = { ...post, updatedOn };
  const response = await executeAuthenticatedRequest(() =>
    backendRequest.put(`${BLOG_POST_URL}/${url}`, JSON.stringify(postToUpdate))
  );
  return response?.data;
}

export async function deletePost(url) {
  try {
    const response = await executeAuthenticatedRequest(() =>
      backendRequest.delete(`${BLOG_POST_URL}/${url}`)
    );
    if (response.ok()) {
      await deleteFile(`${IMAGES_DIRECTORY}/${url}`);
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
}
