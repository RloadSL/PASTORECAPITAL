import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { Webinars } from "domain/Webinars/Webinars";
import { elasticSearch, ELASTIC_QUERY } from "infrastructure/elasticsearch/search.elastic";
import FireFirestore from "infrastructure/firebase/firestore.firebase";
import { FireFunctionsInstance } from "infrastructure/firebase/functions.firebase";
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
  parseDataFromElastic(elasticResult: any[]): Webinars[] {
    return elasticResult.map(item => {
      const res: Webinars = {
        id: item.id.raw,
        title: item.title.raw,
        description: item.description.raw,
        date: new Date(item.date.raw),
        created_at: new Date(item.created_at.raw),
        guests: item.id.raw,
        state: item.id.raw
      }
      if (item.deferred_video) {
        const deferred_video = JSON.parse(item.deferred_video.raw)
        res.deferred_video = deferred_video
      }

      if (item.thumb) {
        const thumb = JSON.parse(item.thumb.raw)
        res.thumb = thumb
      }

      return res;
    })
  }

  async elasticSearch(query: ELASTIC_QUERY): Promise<{ results: Webinars[], page: any }> {
    const elasticRes = await elasticSearch('webinars', query)
    const page = elasticRes.data.meta.page;
    let results = elasticRes.data.results

    if (!results) {
      return { results: [], page: null }
    } else {
      return { results: this.parseDataFromElastic(results), page }
    }
  }
  async get(w_id: string): Promise<Webinars | undefined> {
    const ref = await FireFirestore.getDoc('webinars', w_id)
    if (ref) {
      const refData = ref.data() as any;
      const webinars: Webinars = { ...refData as any, date: refData.date.toDate(), created_at: refData.created_at.toDate(), id: ref.id }
      return webinars
    }
  }

  async set(data: Webinars) {
    try {
      if (data.thumb instanceof File) {
        const gcs_path = `webinars/${data.title?.replace(/' '/g, '_')}`
        const thumbUri = await storageFirebase.UploadFile(gcs_path, data.thumb)
        data.thumb = {
          created_at: new Date(),
          url: thumbUri,
          gcs_path
        }
      }
      else{
        delete data.thumb;
      }

      if (data.id) {
        await FireFirestore.setDoc('webinars', data.id, data)
        return data.id;
      } else {
        delete data.id;
        const res = await FireFirestore.createDoc('webinars', { ...data, state: 'active', state_chat: 'private' })
        return res;
      }
    } catch (error) {
      return error;
    }
  }

  async delete(w_id: string) {
    await FireFirestore.deleteDoc('webinars', w_id)
  }
  async register(data: { w_id: string, name: string, lastname: string, email: string }) {
    await FireFunctionsInstance.onCallFunction('webinarsRegisterOnCallFunctions', data)
  }

  async isRegistered(data: { w_id: string, email: string }) {
    const ref = await FireFirestore.getCollectionDocs(`webinars/${data.w_id}/users_register`,undefined, [['email', '==', data.email]], 1)
    if(ref instanceof ErrorApp){
      return ref as ErrorApp
    }else{
      return ref.length > 0;
    }
  }

  uploadDeferredVideo(w_id: string, video: File, progressState: Function) {
    const gcs_path = `webinars/${w_id}/${video.name?.replace(/' '/g, '_')}`
    const task = storageFirebase.uploadFileObserver(gcs_path, video, progressState)
    task.then(t => {
      if(t.state == 'success'){
        FireFirestore.setDoc(`webinars`, w_id, {deferred_video: {
          created_at: new Date(),
          gcs_path
        }}).catch(e => console.log(e))
      }
    })
    
    return task;
  }
}

export default WebinarsRepository.getInstance()