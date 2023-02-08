import { FirebaseApp } from 'firebase/app';
import { limit, onSnapshot, startAt, where, Unsubscribe, getFirestore, addDoc, collection, collectionGroup,getDocs, getDoc, Firestore, CollectionReference, doc, DocumentReference, setDoc, connectFirestoreEmulator, deleteDoc, query, orderBy, DocumentSnapshot, startAfter, QueryConstraint, Query, DocumentData } from "firebase/firestore";
import { cleanUndefined } from './utils'
import FireFirebase from './firebase';
import { on_cloud_firebase } from './config';
import { ErrorApp } from 'domain/ErrorApp/ErrorApp';

/**
 * Integración con el módulo de firestore de Firebase
 */
export class FireFirestore {
  private _db: Firestore;
  private static instance: FireFirestore;
  private constructor(app: FirebaseApp) {
    this._db = getFirestore(app);
    if (FireFirebase.emulatiorEnable && !on_cloud_firebase) {
      connectFirestoreEmulator(this._db, 'localhost', 8080);
    }
  }
  public static getInstance(app: FirebaseApp): FireFirestore {
    if (!FireFirestore.instance) {
      FireFirestore.instance = new FireFirestore(app);
    }

    return FireFirestore.instance;
  }
  private _collection = (collectionPath: string): CollectionReference => collection(this._db, collectionPath);
  private _collectionGrup = (collectionPath: string): Query<DocumentData> => collectionGroup(this._db, collectionPath);

  private _doc = (collectionPath: string, docId: string): DocumentReference => doc(this._db, collectionPath, docId);
  private _where = (wheres: Array<Array<any>>) => wheres.map(condition => where(condition[0], condition[1], condition[2]))
  private _orderBy = (orderByFiles: Array<string>) => orderByFiles.map(condition => orderBy(condition, 'desc') )

  public getCollectionDocs = async (collectionPath: string, lastSnap?: DocumentSnapshot, queryWhere?: Array<Array<string>>, limitItems = 20, orderByFiles:Array<string> = ['created_at']) => {
    let documentSnapshots;
    try {
      const collection = this._collection(collectionPath);
      let wheres: QueryConstraint[] = [];
      if (queryWhere) {
        wheres = this._where(queryWhere);
      }

      if (!lastSnap) {
        const firstQuery = query(collection, 
          ...wheres, 
          ...this._orderBy(orderByFiles), limit(limitItems));

        documentSnapshots = await getDocs(firstQuery);
      } else {
        const next = query(this._collection(collectionPath),
          ...wheres, 
          ...this._orderBy(orderByFiles),
          startAfter(lastSnap),
          limit(limitItems));
        documentSnapshots = await getDocs(next);
      }

      return documentSnapshots.docs;
    } catch (error) {
      console.log(error)
      return new ErrorApp({errorCode: 'firestore@error', errorMessage: 'firestore@error'})      
    }

  }

  public getCollectionGroupDocs = async (collectionPath: string, lastSnap?: DocumentSnapshot, queryWhere?: Array<Array<string>>, limitItems = 20) => {
    let documentSnapshots;
    try {
      const collection = this._collectionGrup(collectionPath);
      let wheres: QueryConstraint[] = [];
      if (queryWhere) {
        wheres = this._where(queryWhere);
      }
      if (!lastSnap) {
        const firstQuery = query(collection, ...wheres, orderBy("created_at", 'desc'), limit(limitItems));

        documentSnapshots = await getDocs(firstQuery);
      } else {

        const next = query(this._collection(collectionPath),
          ...wheres, 
          orderBy("created_at", 'desc'),
          startAfter(lastSnap),
          limit(limitItems));
        documentSnapshots = await getDocs(next);
      }
      return documentSnapshots.docs;
    } catch (error) {
      console.log(error)
      return new ErrorApp({errorCode: 'firestore@error', errorMessage: 'firestore@error'})      
    }

  }

  public getDoc = async (collectionPath: string, docId: string) => {
    try {
      const docRef = this._doc(collectionPath, docId);
      const snapshot = await getDoc(docRef);
      return snapshot
    } catch (error:any) {
      console.log(error)
      console.error('Firebase response: '+error.code);
    }
  }
  /**
     * Implementación delete de Firestore
     * @param collectionPath Path de la colección o subcolección del documento a modificar
     * @param docId Id del documento
     */
  public deleteDoc = async (collectionPath: string, docId: string): Promise<void> => {
    try {
      const docRef = this._doc(collectionPath, docId);
      await deleteDoc(docRef)
    } catch (error:any) {
      console.error('Firebase response: '+error.code);
    }
  }
  /**
   * Implementación del set de Firestore
   * @param collectionPath Path de la colección o subcolección del documento a modificar
   * @param docId Id del documento
   * @param data Data a modificar
   */
  public setDoc = async (collectionPath: string, docId: string, data: any) => {
    try {
      const docRef = this._doc(collectionPath, docId);
      const res = await setDoc(docRef, cleanUndefined(data), {merge: true});
    } catch (error:any) {
      console.error('Firebase response: '+error.code);
    }
  }
  /**
   * Implementación del crear documento de Firestore
   * @param collectionPath Path de la colección o subcolección del documento a modificar
   * @param data Data a modificar
   */
  public createDoc = async (collectionPath: string, data: any): Promise<any | undefined> => {
    try {
      const collection = this._collection(collectionPath);
      const snap = await addDoc(collection, cleanUndefined(data));
      return { ...data, id: snap.id };
    } catch (error:any) {
      
      console.error('Firebase response: '+error.code);
    }
  }

  public onChangeDoc = (path: string, callback: Function): Unsubscribe => {
    const unsub = onSnapshot(doc(this._db, path), (doc) => {
      if (doc.exists())
        callback({ ...doc.data(), id: doc.id });
    });
    return unsub;
  }
}

export default FireFirestore.getInstance(FireFirebase.app)