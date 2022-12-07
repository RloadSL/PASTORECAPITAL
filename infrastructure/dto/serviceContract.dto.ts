export interface ServiceContractDto {
  uid:string
  service_id:string
  createdAt:Date
  amount:number
  payment_id:string
  status: 'pending' | 'progress' | 'completed'
}