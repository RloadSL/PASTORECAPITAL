

import { User } from "../../domain/User/User";
import { UserRepository } from "../../domain/User/user.repository";
import FireFirestore  from "../firebase/firestore.firebase";
import { UpdateUser, UserDto } from "infrastructure/dto/users.dto";
import { QuerySnapshot, Unsubscribe } from "firebase/firestore";
import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { elasticSearch, ELASTIC_QUERY } from "infrastructure/elasticsearch/search.elastic";
/**
 * Implementación de los casos de usos para los usuarios de la plataforma
 */
class UserRepositoryImplementation{
  private static instance: UserRepositoryImplementation;
  public static getInstance(): UserRepositoryImplementation {
    if (!UserRepositoryImplementation.instance) {
      UserRepositoryImplementation.instance = new UserRepositoryImplementation();
    }

    return UserRepositoryImplementation.instance;
  }

  readonly userNotLogged = new User({
    email: '',
    lastname: '',
    name: '',
    role: {
      key: 'user',
      label: 'User',
      level: 0
    },
    uid: 'not-logged',
    subscription: {
      created_at : new Date(),
      plan: {
        key: 'guest',
        label: 'Guest',
        level: 0
      },
      updated_at: new Date()
    }
  })

  async read(uid: string, extradata?: {webToken:string}): Promise<User | null> {
    if (uid == 'not-logged') {
      return this.userNotLogged;
    }
    const userSnap = await FireFirestore.getDoc('users',uid)
    if(userSnap?.exists()){
      let userData:any = {uid: userSnap?.id,...userSnap?.data()};
      if(extradata) userData = {...userData, ...extradata};
      return new User(userData as UserDto);
    }else{
      return null;
    }
  }; 
  
  onChange(uid:string, callback:Function): Unsubscribe {
    return FireFirestore.onChangeDoc(`users/${uid}`, (userData:UserDto)=>{
      callback(new User(userData));
    })
  };

  async update(uid: string, data: UpdateUser): Promise<User | null> {
    try {
       await FireFirestore.setDoc('users',uid, data)
       const user = await this.read(uid);
       return user;
    } catch (error) {
      console.error(error)
      console.error('Error inteno en user.repository')
      return null;
    }
  };
  
  async delete(uid: string): Promise<void> {
    try {
      await FireFirestore.deleteDoc('users',uid)
    } catch (error) {
      console.error(error)
      console.error('Error inteno en user.repository')
    }
  };

  /**
   * Administration functions
   */

  async getAll() : Promise<ErrorApp | User[]>{
    const querySnap = await FireFirestore.getCollectionDocs('users')
    if(querySnap instanceof ErrorApp){
      return querySnap as ErrorApp;
    }else{
      return querySnap?.map((item) => new User(item.data() as UserDto))
    }
  }

  async elasticSearchUsers(query:ELASTIC_QUERY) : Promise<any>{
      const elasticRes = await elasticSearch('users', query)
      const page = elasticRes.data.meta.page;
      let results = elasticRes.data.results
      //const response:any = await FireFunctionsInstance.onCallFunction('getConsultantsTriggerFunctions');
     
      if(!results){
        return {results: [], page:null}
      }else{
        const promises = results.map(async (item: any) =>{
          const uc = await this.read(item.uid.raw)
          return uc
        }) 
        results = await Promise.all(promises).catch(e => console.log(e))
        return {results, page}
      }
   }
  

}

export const UserRepositoryImplInstance = UserRepositoryImplementation.getInstance()