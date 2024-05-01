import { MATERIALS_URL } from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";
import { handleUnauthorized } from "@/utils/ApiUtils";

export async function updateUniversityMaterials(university) {
  try {
    const response = await backendRequest.put(
      MATERIALS_URL,
      JSON.stringify(university)
    );
    return response.data;
  } catch (error) {
    handleUnauthorized(error);
  }
}

export async function getUniversities() {
  const response = await backendRequest.get(MATERIALS_URL);
  return response.data;
}

export async function getUniversityByName(name) {
  const response = await backendRequest.get(`${MATERIALS_URL}/${name}`);
  return response.data;
}
