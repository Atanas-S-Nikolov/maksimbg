import { BASE_URL } from "@/constants/URLConstants";
import axios from "axios";

export const backendRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})
