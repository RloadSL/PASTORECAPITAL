import { QueryElastic } from "domain/Interfaces/QueryElastic";
import { ServiceDto } from "infrastructure/dto/service.dto";

export default class Service {
  id:string
  title: string
  image?: any
  description: string
  time:number
  price:number
  keywords:string[]
  functions?:string[]
  form?:{
    url:string,
    created_at: Date
  }
  created_at: Date
  userConsultantId:string

  constructor(data:ServiceDto){
    this.id = data.id as string
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

  getClients(query: QueryElastic){}
  set(data:ServiceDto){}
  hireService(data:any){}
  delete(){}
}