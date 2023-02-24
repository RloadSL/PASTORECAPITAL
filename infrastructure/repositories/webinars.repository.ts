import { Webinars } from "domain/Webinars/Webinars";
import { elasticSearch, ELASTIC_QUERY } from "infrastructure/elasticsearch/search.elastic";
import FireFirestore  from "infrastructure/firebase/firestore.firebase";
import storageFirebase from "infrastructure/firebase/storage.firebase";

class WebinarsRepository {
  private static instance: WebinarsRepository;
  private constructor() { };

  public static getInstance(): WebinarsRepository {
    if (!WebinarsRepository.instance) {
      WebinarsRepository.instance = new WebinarsRepository();
    }
    return WebinarsRepository.instance;
  }
  /***
   * Elastic
   */
  async elasticSearch(query:ELASTIC_QUERY) : Promise<any>{
    const elasticRes = await elasticSearch('webinars', query)
    const page = elasticRes.data.meta.page;
    let results = elasticRes.data.results
   
    if(!results){
      return {results: [], page:null}
    }else{
      return {results, page}
    }
 }
  async get(w_id:string):Promise<Webinars | undefined>{
    const ref = await  FireFirestore.getDoc('webinars', w_id)
    if(ref){
      const refData = ref.data() as any;
      const webinars: Webinars = {...refData as any, date: refData.date.toDate(), created_at : refData.created_at.toDate()}
      return webinars
    }
  }

  async set(data: Webinars){
    try {
      if(data.thumb instanceof File){
        const gcs_path = `webinars/${data.title?.replace(/' '/g, '_')}`
        const thumbUri = await storageFirebase.UploadFile(gcs_path, data.thumb)
        data.thumb = {
          created_at: new Date(),
          url : thumbUri,
          gcs_path
        }
      }
     
      if(data.id){
        console.log('setDoc')

        await FireFirestore.setDoc('webinars', data.id, data)
        return data.id;
      }else{
        delete data.id;
        const res = await FireFirestore.createDoc('webinars', {...data, state: 'active', state_chat:'private'})
        return res;
      }
    } catch (error) {
      return error;
    }
  }

  async delete(w_id:string){
    await FireFirestore.deleteDoc('webinars', w_id)
  }

  async uploadDeferredVideo(w_id:string, video:File, progressState: Function){
    const gcs_path = `webinars/${w_id}/${video.name?.replace(/' '/g, '_')}`
    const task = await storageFirebase.uploadFileObserver(gcs_path, video, progressState)
    //const url = await storageFirebase.fileLink(task.ref); 
    return task;
  }
}

export default WebinarsRepository.getInstance()