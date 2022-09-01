import { CreateUser } from "../../Models/Users/User"
import { getTransport } from './configTransport'
import * as path from 'path'
import * as fs from 'fs'

export const signUpMailer = async (user: CreateUser) => {
  const pathFile = path.join(__dirname, `../html/wellcome.html`)

  const templateBruto = fs.readFileSync(pathFile).toString()
  const template = templateBruto.replace(
    '$USER_NAME$',
    user.full_name
  )


  var message = {
    from: '"Race the Planet" <no-reply@racetheplanet.run>',
    to: user.email,
    subject: 'Bienvenido a Pastore Capital',
    html: template
  }

  getTransport().sendMail(message, (err: any) => {
    if (err) {
      console.log(err)
      return { status: 500, err: err.message };
    } else {
      return { status: 200 };
    }
  })
}

