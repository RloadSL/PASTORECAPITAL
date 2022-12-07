import { QueryElastic } from "domain/Interfaces/QueryElastic";
import { ServiceDto } from "infrastructure/dto/service.dto";

export default class Service {
  id:string
  title: string
  description: string
  duration:number
  price:number
  keywords:string[]
  required_form:boolean
  createdAt: Date
  userConsultantId:string

  constructor(data:ServiceDto){
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.duration = data.duration
    this.price = data.price
    this.keywords = data.keywords
    this.required_form = data.required_form
    this.createdAt = data.createdAt
    this.userConsultantId = data.userConsultantId
  }

  getClients(query: QueryElastic){}
  set(data:ServiceDto){}
  hireService(data:any){}
  delete(){}
}