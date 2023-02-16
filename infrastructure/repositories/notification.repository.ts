import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { DocumentSnapshot } from "firebase/firestore";
import { NotificationDto } from "infrastructure/dto/notification.dto";
import FireFirestore  from "infrastructure/firebase/firestore.firebase";

 class Notification{
  private static instance: Notification;
  readonly _collection = 'notifications' 
  public static getInstance(): Notification {
    if (!Notification.instance) {
      Notification.instance = new Notification();
    }
    return Notification.instance;
  }

  fetching = false;

  async get(uid:string, lastSnap?:any):Promise<any> {
    if(this.fetching) return null;
    const query = [['to.uid', '==' , uid]]
    this.fetching = true;
    const ref = await FireFirestore.getCollectionDocs(this._collection, lastSnap , query)
    this.fetching = false;
    if( !(ref instanceof ErrorApp) && ref.length > 0){
      return {
      items: ref.map(item => ({...item.data(), id:item.id})), 
      lastSnap: ref.length >= 20 ? ref[ref.length - 1] : undefined}
    }else{
      return {items: []};
    }
  }

  async create(data:NotificationDto){
    const result = (await FireFirestore.createDoc(this._collection, data)).id
    return result;
  }

  async delete(n_id:string){
    const result = await FireFirestore.deleteDoc(this._collection, n_id)
    return result;
  }

 }

 export default Notification.getInstance()