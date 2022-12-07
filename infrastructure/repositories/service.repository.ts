import { ServiceDto } from "infrastructure/dto/service.dto";

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
  createService(data: ServiceDto) { }
  /**
   * Retorna todos los servicios de un asesor [ElasticSearch]
   * @param id Identificador de los datos del asesor en firebase  tabla (user_consultant)
  */
  getService(id: string) { }
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