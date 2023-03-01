import { FirebaseApp } from "firebase/app";
import { FirebaseStorage, getDownloadURL, getStorage, ref, StorageReference, uploadBytes, uploadBytesResumable, uploadString, UploadTask } from "firebase/storage";
import firestoreFirebase from "./firestore.firebase";
import FireFirebase from './firebase';
import {FireFunctionsInstance} from "./functions.firebase";
class StorageFirebase {
  private static instance: StorageFirebase;
  private _storage: FirebaseStorage;
  private constructor(app: FirebaseApp) {
    this._storage = getStorage(app);
  }

  public static getInstance(app: FirebaseApp): StorageFirebase {
    if (!StorageFirebase.instance) {
      StorageFirebase.instance = new StorageFirebase(app);
    }
    return StorageFirebase.instance;
  }

  /**
   * UploadBase64
   */
  public async UploadBase64(path: string, data_url: string) {
    const storageRef = ref(this._storage, path);
    const snap = await uploadString(storageRef, data_url, 'data_url')
    const url = await getDownloadURL(snap.ref);
    return url;
  }
  /**
 * UploadFile
 */
  public async UploadFile(path: string, file: File) {
    const storageRef = ref(this._storage, path);
    const snap = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snap.ref);
    return url;
  }

  async getDownloadLink(path: string) {
    const reference = ref(this._storage, path)
    const url = await getDownloadURL(reference);
    return url;
  }

  uploadFileObserver(path: string, file: File, progressCallback?: Function): UploadTask {
    const storageRef = ref(this._storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if(progressCallback) progressCallback(progress)
      },
      (error) => {
        if(progressCallback) progressCallback(-1)
      }
    );

    return uploadTask;
  }

  async fileLink(pathFile:string,data: {}){
    FireFunctionsInstance.onCallFunction('storageCallableUrl')
    
  }
}

export default StorageFirebase.getInstance(FireFirebase.app)