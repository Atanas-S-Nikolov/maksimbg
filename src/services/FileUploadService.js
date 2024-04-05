import { DEFAULT_FILE_UPLOAD_ERROR_MESSAGE, TRY_AGAIN_LATER_FILE_UPLOAD_ERROR_MESSAGE } from "@/constants/ErrorMessages";
import { storage } from "../../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export function uploadFiles(files, directory, onProgressUpdate, onFinished, onError) {
  return Array.from(files).map((file) => {
    const metadata = {
      contentType: file.type,
    };

    try {
      const storageRef = ref(storage, `${directory}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      return uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = parseInt(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgressUpdate(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          if (error.code === "storage/quota-exceeded" || error.code === "storage/retry-limit-exceeded") {
            onError(TRY_AGAIN_LATER_FILE_UPLOAD_ERROR_MESSAGE);
            return;
          }
          onError(DEFAULT_FILE_UPLOAD_ERROR_MESSAGE);
        },
        async () => {
          onFinished();
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
}

export async function getFilesByDirectory(directory) {
  const storageRef = ref(storage, directory);
  return await listAll(storageRef)
    .then(async (res) => {
      const promises = res.items.map((item) => {
        return new Promise(async (resolve) => {
          resolve({
            fileName: item.name,
            url: await getDownloadURL(item),
          });
        });
      });
      return await Promise.all(promises);
    })
    .catch((error) => console.log(error));
}
