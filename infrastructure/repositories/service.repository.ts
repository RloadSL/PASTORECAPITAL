import Service from "domain/Service/Service";
import { ServiceDto } from "infrastructure/dto/service.dto";
import firestoreFirebase from "infrastructure/firebase/firestore.firebase";
import FireFirestore  from "infrastructure/firebase/firestore.firebase";
import { FireFunctionsInstance } from "infrastructure/firebase/functions.firebase";
import storageFirebase from "infrastructure/firebase/storage.firebase";
import { parseFirestoreDocs } from "infrastructure/firebase/utils";

class ServiceRepository {
  private static instance: ServiceRepository;

  public static getInstance(): ServiceRepository {
    if (!ServiceRepository.instance) {
      ServiceRepository.instance = new ServiceRepository();
    }
    return ServiceRepository.instance;
  }
  loading: boolean = false;
  /**
   * Retorna el listado de clientes del servicio
   * @param id Identificador del servicio en firebase tabla (user_consultant)
   */
  getClients(id: string) {
    const res: any = null;
    return res;
  }

  /**
   * Upload Files 
   */
  async uploadFiles(data:ServiceDto){

    if(data.image instanceof File){
      data.image = {
        url: await storageFirebase.UploadFile(`services/${data.image.name}`, data.image as File),
        created_at: new Date()
      }
    }else{
      delete data.image
    }  

    if(data.form instanceof File){
      data.form = {
        url: await storageFirebase.UploadFile(`services/${data.form.name}`, data.form as File),
        created_at: new Date()
      }
    }else{
      delete data.form
    }  
    return data;
  }

  /**
   * Crea y retorna un servicio para el Asesor [ElasticSearch]
   */
  async createService(data: ServiceDto): Promise<string> { 
    data = await this.uploadFiles(data)
    console.log('createService', data)
    let result;
    if(data.id){
      await FireFirestore.setDoc('services', data.id, data)
      result = data.id;
    }else{
      result = (await FireFirestore.createDoc('services', data)).id
    }

    return result;
  }
  /**
   * Retorna unservicio servicios de un asesor [ElasticSearch]
   * @param sid Identificador del servicio
  */
  async getService(sid: string):Promise<Service | undefined > { 
    const res:any = await firestoreFirebase.getDoc('services',sid)
    if(res.exists()){
      const result = new Service({...res.data(), id: res.id})
      return  result;  
    }
    return undefined;
  }
  /**
   * Retorna todos los servicios de un asesor [ElasticSearch]
   * @param cid Identificador de los datos del asesor en firebase  tabla (user_consultant)
  */
  async getServices(cid: string, active: boolean = false) { 
    const query:any[][] = [['userConsultantId', '==' , cid]];
    const orderBy = ['created_at']
    if(active){
      query.push(['user_count', '>', 0])
      orderBy.unshift('user_count')
    }
    const res:any = await firestoreFirebase.getCollectionDocs('services',undefined,query, undefined, orderBy)
    const result = parseFirestoreDocs(res).map(items => new Service({...items, id: items.docID}))
    
    return  result; 
  }
  /**
   * Modifica o crea los datos del servicio
   */
  async setService(data: ServiceDto){
    
    data = await this.uploadFiles(data)
    if( data.keywords && !Array.isArray(data.keywords) ){
      data.keywords = (data.keywords as string).split(',');
    }
    console.log('setService', data)

    const res:any = await firestoreFirebase.setDoc('services',data.id as string, data)
    return res;
  }

  async listenChengeUserService(s_id:string, us_uid:string, callback:Function){
    const unsub = firestoreFirebase.onChangeDoc(`services/${s_id}/service_users/${us_uid}`, callback)
    return unsub;
  }
 
  /**
   * Procesa la contratación del servicio por parte del usuario
   */
  async hireServiceIntent(data:any){
    this.loading = true;
    const res = await FireFunctionsInstance.onCallFunction('PaymentIntentTriggerFunctions', data)
    if(!res.error){
      console.log('hireServiceIntent Service', res)
      return res;
    }else{
      return null;
    }
  }
  /**
   * Integration calendly
   */
  apiCalendly(data:any){}
  /**
   * Integracion stripe, cuando se crea un servicio se tiene que crear un producto en stripe
   */
  apiStripe(data:any){}
}

export default ServiceRepository.getInstance();