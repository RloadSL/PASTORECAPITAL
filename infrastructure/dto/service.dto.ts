
export interface ServiceDto {
  id?:string
  title?: string
  image?: {
    created_at: any,
    url: string
  } | File
  description?: string
  time?:number
  price?:number
  keywords?:string[]
  functions?: string[]
  form?: {
    created_at: any,
    url: string
  } | File
  created_at?: any
  userConsultantId?:string
  user_count?:number
}