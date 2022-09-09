import { auth } from 'firebase-admin';
import { https } from 'firebase-functions';
import { buildTemplate, sendMailer } from '../Mailer/controllers/send-mailers';
import { deleteUserFields, getUser, setUser } from '../Users/users';

const sendCode = async ({email}:{email: string}, context: https.CallableContext)=>{
  if(!email) return {status: 400, error: 'Data contains undefined value'}
  try {
    const userRecord = await auth().getUserByEmail(email).catch(err => null);
    if(!userRecord) return {status: 404, error: 'user@not-found'}
    const code = Math.floor((Math.random() * 10000))  
    await sendMailer([email], 'Bienvenido a PC', buildTemplate('security-code', {code})).catch(e => console.error(e));
    
    await setUser(userRecord.uid, { security_code: {code , created_at: new Date(new Date().toLocaleDateString('es-ES'))},  })
    return {status: 200, error: null}
  } catch (error) {
    console.log(error)
    return {status: 500, error}
  }
}

export const SendSecurityCodeTrigger = https.onCall((data, context)=>sendCode(data,context))

const validateCode = async ({email, code}:{email: string, code: number}, context: https.CallableContext)=>{
  if(!email || !code) return {status: 400, error: 'Data contains undefined value'}
  try {
    const uid = (await auth().getUserByEmail(email)).uid;
    if(!uid) return {status: 404, error: 'User not found'}
    const user = await getUser(uid);
    if(user?.security_code) return {status: 401, error: 'Unauthorized'}
    const codeDate:Date = user.security_code.created_at.toDate();
    if(codeDate > new Date(codeDate.setDate(1))){
      return {status: 401, error: 'code@'}
    }

    if(code === user?.security_code.code){
      await deleteUserFields(uid, { security_code: null  })
      return {status: 200, error: null}
    } 

    return {status: 401, error: 'Unauthorized'}
  } catch (error) {
    console.log(error)
    return {status: 500, error}
  }
}

export const ValidateSecurityCodeTrigger = https.onCall((data, context)=>validateCode(data,context))