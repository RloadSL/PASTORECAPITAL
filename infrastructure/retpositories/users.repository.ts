import { User } from "../../domain/User/User"
import { usersDTO } from "../dto/users.dto"
import { http } from "../http/http"


  const getUser = async () => {
    const user = await http.get<usersDTO[]>('http://localhost:3001/products')
   
    return user.map((userDTO): User => {
      const params = {
        fullName:'prueba',
        role : { level: 0 , label: 'Invitado' }
      }

      return new User(params);
    })
  }

  export const userRepository = {
    getUser
  }