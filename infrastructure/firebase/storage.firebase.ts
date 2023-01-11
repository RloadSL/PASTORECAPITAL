import { FirebaseApp } from "firebase/app";
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import firestoreFirebase from "./firestore.firebase";
import FireFirebase from './firebase';
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
   public async UploadBase64(path:string, data_url:string) {
    const storageRef = ref(this._storage, path);
    const snap = await uploadString(storageRef, data_url, 'data_url')
    const url = await getDownloadURL(snap.ref);
    return url;
  }
    /**
   * UploadFile
   */
    public async UploadFile(path:string, file:File) {
      const storageRef = ref(this._storage, path);
      const snap = await uploadBytes(storageRef, file)
      const url = await getDownloadURL(snap.ref);
      return url;
    }
}

export default StorageFirebase.getInstance(FireFirebase.app)