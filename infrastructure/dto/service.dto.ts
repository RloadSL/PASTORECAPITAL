export interface ServiceDto {
  id:string
  title: string
  description: string
  duration:number
  price:number
  keywords:string[]
  required_form:boolean
  createdAt: Date
  userConsultantId:string
}