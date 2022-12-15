import { ServiceDto } from "infrastructure/dto/service.dto";
import { UserConsultantDto } from "infrastructure/dto/userConsultant.dto";
import StorageFirebase from "infrastructure/firebase/storage.firebase";
import FireFirestore from "../firebase/firestore.firebase";

class UserConsultantRepository{
  private static instance: UserConsultantRepository;

  public static getInstance(): UserConsultantRepository {
    if (!UserConsultantRepository.instance) {
      UserConsultantRepository.instance = new UserConsultantRepository();
    }
    return UserConsultantRepository.instance;
  }
  /**
   * Retorna el listado de clientes del Asesor
   * @param id Identificador del perfil del asesor en firebase tabla (user_consultant)
   */
  getClients(id:string){
    const res:any = null;
    return res;
  }
  /**
   * Crea y retorna un servicio para el Asesor [ElasticSearch]
   */
  createService(data:ServiceDto){}
  /**
   * Retorna todos los servicios de un asesor [ElasticSearch]
   * @param id Identificador de los datos del asesor en firebase  tabla (user_consultant)
  */
  getService(id:string){}
  /**
   * Retorna los datos de un Asesor
   * @param id Identificador de los datos del asesor en firebase  tabla (user_consultant)
   */
  getUserConsultant(id:string){}
  /**
   * Modifica o crea los datos del asesor
   */
  async setUserConsultant(data: UserConsultantDto){
    if(typeof data.avatar === 'string'){
      const avtUri = await StorageFirebase.UploadBase64(`user_consultant/${data.uid}/avatar`, data.avatar as string)
      data.avatar = {
        created_at: new Date(),
        size : 200,
        url : avtUri
      }
    }
    
    data.created_at = new Date();
    FireFirestore.createDoc('user_consultant', data)
    const res:any = null;
    return res;
  }
  /**
   * Elimina el perfil del asesor, esto no quiere decir que elimine el usuario ni su capacidad de colaboración en este módulo
   */
   deleteUserConsultant(id:string){}
}

export default UserConsultantRepository.getInstance();