import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

export const cleanUndefined = (data:any)=>{
  const result:any = {};
  Object.keys(data).forEach(item => data[item] ? result[item] = data[item] : result[item] = null )
  return result;
}

export const  parseFirestoreDocs = ( docs:any): any[] => {
  return docs.map((item:DocumentSnapshot) => ({ docID: item.id, ...item.data() }))
}

