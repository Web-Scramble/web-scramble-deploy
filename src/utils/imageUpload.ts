import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "@/firebase";
// import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
// import { storage } from "@/firebase";

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


interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Upload a single file and return its URL
export const uploadSingleFile = async (attachment: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!attachment || !attachment.file) {
      reject(new Error('Invalid attachment'));
      return;
    }

    // Create a unique filename to prevent collisions
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${attachment.name}`;
    const storageRef = ref(storage, uniqueFileName);
    
    const uploadTask = uploadBytesResumable(storageRef, attachment.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`${attachment.name} upload is ${progress}% done`);
      },
      (error) => {
        console.error(`Error uploading ${attachment.name}:`, error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL,"download url")
          resolve(downloadURL);
        } catch (error) {
          console.error(`Error getting download URL for ${attachment.name}:`, error);
          reject(error);
        }
      }
    );
  });
};

// Main function to upload multiple attachments
export const attachmentsUpload = async (attachments: any[]): Promise<{ urls: string[], uploadedFiles: any[] }> => {
  if (!attachments || attachments.length === 0) {
    return { urls: [], uploadedFiles: [] };
  }

  try {
    // Upload all files concurrently and wait for all to complete
    const uploadPromises = attachments.map(attachment => uploadSingleFile(attachment));
    const urls = await Promise.all(uploadPromises);

    // Create metadata array for uploaded files
    const uploadedFiles = attachments.map((attachment, index) => ({
      fileName: attachment.name,
      type: attachment.type,
      fileSize: attachment.size,
      name: urls[index]
    }));

    return {
      urls,
      uploadedFiles
    };
  } catch (error) {
    console.error('Error uploading attachments:', error);
    throw error;
  }
};

// Optional: Progress tracking version if needed
export const attachmentsUploadWithProgress = async (
  attachments: any[],
  onProgress?: (progress: UploadProgress[]) => void
): Promise<{ urls: string[], uploadedFiles: any[] }> => {
  if (!attachments || attachments.length === 0) {
    return { urls: [], uploadedFiles: [] };
  }

  const progressMap = new Map<string, UploadProgress>();
  
  const uploadSingleFileWithProgress = async (attachment: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const uniqueFileName = `${Date.now()}-${attachment.name}`;
      const storageRef = ref(storage, uniqueFileName);
      const uploadTask = uploadBytesResumable(storageRef, attachment.file);

      progressMap.set(attachment.name, {
        fileName: attachment.name,
        progress: 0,
        status: 'pending'
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressMap.set(attachment.name, {
            fileName: attachment.name,
            progress,
            status: 'uploading'
          });
          onProgress?.(Array.from(progressMap.values()));
        },
        (error) => {
          progressMap.set(attachment.name, {
            fileName: attachment.name,
            progress: 0,
            status: 'error',
            error: error.message
          });
          onProgress?.(Array.from(progressMap.values()));
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            progressMap.set(attachment.name, {
              fileName: attachment.name,
              progress: 100,
              status: 'completed',
              url: downloadURL
            });
            onProgress?.(Array.from(progressMap.values()));
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  try {
    const uploadPromises = attachments.map(attachment => 
      uploadSingleFileWithProgress(attachment)
    );
    const urls = await Promise.all(uploadPromises);

    const uploadedFiles = attachments.map((attachment, index) => ({
      // fileName: attachment.name,
      type: attachment.type,
      // fileSize: attachment.size,
      name: urls[index]
    }));

    return {
      urls,
      uploadedFiles
    };
  } catch (error) {
    console.error('Error uploading attachments:', error);
    throw error;
  }
};