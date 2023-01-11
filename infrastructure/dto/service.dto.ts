
export interface ServiceDto {
  id?:string
  title?: string
  image?: {
    created_at: any,
    url: string
  } | File
  description?: string
  duration?:number
  price?:number
  keywords?:string[]
  form?: {
    created_at: any,
    url: string
  } | File
  created_at?: Date
  userConsultantId?:string
}