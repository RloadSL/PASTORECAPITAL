export type NotiType = 'CONSULTANT_MANAGE_USER' | 'CONSULTANT_COMPLETE_USER_SERVICE'


export interface NotificationDto {
  id?:string,
  type: NotiType,
  created_at: Date,
  message?: string,
  calendly?: string,
  metadata?: any,
  read?: boolean,
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