
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json'
}

const get = async <T>(url: string) => {
  //Implementar con axios
  return [];
}

const post = async <T>(url: string, body: any) => {
  //Implementar con axios
}

const put = async <T>(url: string, body: any) => {
 //Implementar con axios
}

const _delete = async <T>(url: string) => {
  //Implementar con axios
}

export const http = {
  get,
  post,
  put,
  delete: _delete
}