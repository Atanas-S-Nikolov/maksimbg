import { MATERIALS_URL } from "@/constants/URLConstants";
import { backendRequest } from "@/lib/backend";

export async function updateUniversityMaterials(university) {
  const response = await backendRequest.put(
    MATERIALS_URL,
    JSON.stringify(university)
  );
  return await response.data;
}

export async function getUniversities() {
  const response = await backendRequest.get(MATERIALS_URL);
  return await response.data;
}
