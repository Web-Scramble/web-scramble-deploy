import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "@/firebase";

  export const attachmentUpload = (attachment) => {
    if(!attachment){
      return
    }
    let url = "empty"
    const storageRef = ref(storage,attachment.name);
    const uploadTask = uploadBytesResumable(storageRef, attachment.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is" + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload paused");
            break;
          case "running":
            console.log("Upload running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
          // you keep uploaded img url
         url = downloadedURL
        });
      }
    );
    return url
  }