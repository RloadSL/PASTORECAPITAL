import { QueryElastic } from "domain/Interfaces/QueryElastic";
import { UserConsultant } from "domain/UserConsultant/UserConsultant";
import { ServiceDto } from "infrastructure/dto/service.dto";
import userConsultantRepository from "infrastructure/repositories/userConsultant.repository";

export default class Service {
  id:string
  title: string
  image?: any
  description: string
  time:number
  price:any
  keywords:string[]
  functions?:string[]
  form?:{
    url:string,
    created_at: Date
  }
  created_at: Date
  userConsultantId:string
  user_count?:number
  constructor(data:ServiceDto){
    this.id = data.id as string
    this.user_count = data.user_count
    this.title = data.title as string
    this.image = data.image
    this.description = data.description as string
    this.time = data.time as number
    this.price = data.price as number
    this.keywords = data.keywords as Array<string>
    this.form = data.form as any
    this.created_at = data.created_at?.toDate() 
    this.userConsultantId = data.userConsultantId as string
    this.functions = data.functions
  }

  async getUserConsultant(): Promise<UserConsultant | undefined>{
    const uc = await userConsultantRepository.getUserConsultant(this.userConsultantId);
    return uc;
  }

  async isOwner(uid:string){
    const uc = await this.getUserConsultant()
    return uc?.uid === uid
  }

  set(data:ServiceDto){}
  hireService(data:any){}
  delete(){}
}