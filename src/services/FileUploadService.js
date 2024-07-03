import {
  DEFAULT_FILE_UPLOAD_ERROR_MESSAGE,
  TRY_AGAIN_LATER_FILE_UPLOAD_ERROR_MESSAGE,
} from "@/constants/ErrorMessages";
import { storage } from "../../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
  getBytes,
  uploadBytes,
  getMetadata,
} from "firebase/storage";

export function uploadFiles(
  files,
  directory,
  onFinished = () => {},
  onError = () => {},
  onProgressUpdate = () => {}
) {
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
          if (
            error.code === "storage/quota-exceeded" ||
            error.code === "storage/retry-limit-exceeded"
          ) {
            onError(TRY_AGAIN_LATER_FILE_UPLOAD_ERROR_MESSAGE);
            return;
          }
          onError(DEFAULT_FILE_UPLOAD_ERROR_MESSAGE);
        },
        () => {
          onFinished();
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
}

export async function uploadFileBytes(files) {
  const fileUploadPromises = files.map(({ directory, bytes, metadata }) => {
    const fileMetadata = {
      contentType: metadata.contentType,
    };
    const storageRef = ref(storage, directory);
    uploadBytes(storageRef, bytes, fileMetadata);
  });
  return await Promise.all(fileUploadPromises);
}

export async function getFilesByDirectory(directory, filterFileName = "") {
  const storageRef = ref(storage, directory);
  return await listAll(storageRef)
    .then(async (res) => {
      const promises = res.items
        .filter((item) => item.name !== filterFileName)
        .map((item) => {
          return new Promise(async (resolve) => {
            resolve({
              fileName: item.name,
              url: await getDownloadURL(item),
            });
          });
        });
      return await Promise.all(promises);
    })
    .then((files) => {
      return files.map(({ fileName, url }) => {
        const formatedUrl = new URL("?alt=media", url).href;
        return { fileName, url: formatedUrl };
      });
    })
    .catch((error) => console.log(error));
}

export async function getBytesByDirectory(directory) {
  const storageRef = ref(storage, directory);
  const listResponse = await listAll(storageRef);
  const promises = listResponse.items.map((i) => {
    const fileDirectory = `${directory}/${i.name}`;
    return new Promise(async (resolve) => {
      const fileRef = ref(storage, fileDirectory);
      resolve({
        directory: fileDirectory,
        bytes: await getBytes(fileRef),
        metadata: await getMetadata(fileRef),
      });
    });
  });
  return await Promise.all(promises);
}

export async function deleteFile(fileDirectory) {
  try {
    const fileRef = ref(storage, fileDirectory);
    return await deleteObject(fileRef);
  } catch (error) {
    console.log(error);
  }
}
