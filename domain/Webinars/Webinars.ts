export type WEBINARS_STATE = 'COMING' | 'ONLIVE' | 'DEFERRED'

export interface Webinars{
  id?:string
  title:string,
  description?: string,
  date: Date,
  created_at?: Date,
  author: {
    uid: string,
    fullname: string
  },
  thumb?: {
    created_at: Date,
    url?: string,
    gcs_path: string
  },
  state: WEBINARS_STATE,
  deferred_video?: {
    created_at: Date,
    url?: string,
    gcs_path: string
  }
}