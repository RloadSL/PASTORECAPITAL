export type NotiType = 'CONSULTANT_MANAGE_USER' | 'CONSULTANT_COMPLETE_USER_SERVICE'


export  interface NotificationDto {
  id?:string,
  type: NotiType,
  created_at: Date,
  message?: string,
  calendly?: string,
  metadata?: any,
  from: {
    fullname: string,
    email: string,
    uid: string
  },
  to: {
    fullname: string,
    email: string,
    uid: string
  }
}