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

  async get(uid:string, lastSnap?:any){
    const query = [['to.uid', '==' , uid]]
    const result = await FireFirestore.getCollectionDocs(this._collection, lastSnap , query)
    return result;
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