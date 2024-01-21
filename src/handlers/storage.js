import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase.config";

const Storage = {
  uploadFile: (media) => {
    return new Promise(async (resolve) => {
      try {
        const fileRef = ref(storage, `images/${media.title}`);
        uploadBytes(fileRef, media.file).then((snapshot) => {
          resolve({ path: snapshot.metadata.fullPath, name: media.title });
        });
      } catch (error) {
        console.log(error);
      }
    });
  },
  downloadFile: (media) => {
    return new Promise(async (resolve) => {
      try {
        const mediaRef = ref(storage, media.path);
        const fileUrl = await getDownloadURL(mediaRef);
        resolve(fileUrl);
      } catch (error) {
        console.log(error);
      }
    });
  },
};
export default Storage;
