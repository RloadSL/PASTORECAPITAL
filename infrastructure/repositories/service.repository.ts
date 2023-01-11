import { ServiceDto } from "infrastructure/dto/service.dto";
import firestoreFirebase from "infrastructure/firebase/firestore.firebase";
import FireFirestore  from "infrastructure/firebase/firestore.firebase";
import storageFirebase from "infrastructure/firebase/storage.firebase";

class ServiceRepository {
  private static instance: ServiceRepository;

  public static getInstance(): ServiceRepository {
    if (!ServiceRepository.instance) {
      ServiceRepository.instance = new ServiceRepository();
    }
    return ServiceRepository.instance;
  }

  /**
   * Retorna el listado de clientes del servicio
   * @param id Identificador del servicio en firebase tabla (user_consultant)
   */
  getClients(id: string) {
    const res: any = null;
    return res;
  }
  /**
   * Crea y retorna un servicio para el Asesor [ElasticSearch]
   */
  async createService(data: ServiceDto) { 
    if(data.image){
      data.image = {
        url: await storageFirebase.UploadFile('services', data.image as File),
        created_at: new Date()
      }
    }  

    if(data.form){
      data.form = {
        url: await storageFirebase.UploadFile('services', data.form as File),
        created_at: new Date()
      }
    } 

    if(data.id){
      FireFirestore.setDoc('services', data.id, data)
    }else{
      FireFirestore.createDoc('services', data)
    }
  }
  /**
   * Retorna todos los servicios de un asesor [ElasticSearch]
   * @param cid Identificador de los datos del asesor en firebase  tabla (user_consultant)
  */
  async getServices(cid: string) { 
    const res = firestoreFirebase.getCollectionDocs('services',undefined,[['userConsultantId', '==' , cid]])
     parseFirestoreDocs(res);
  }
  /**
   * Modifica o crea los datos del servicio
   */
  setService(data: ServiceDto):ServiceDto{
    const res:any = null;
    return res;
  }
  /**
   * Procesa la contratación del servicio por parte del usuario
   */
  hireService(data:any){}
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