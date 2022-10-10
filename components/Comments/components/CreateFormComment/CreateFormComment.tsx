import ButtonApp from 'components/ButtonApp'
import FormApp from 'components/FormApp'
import TextareaApp from 'components/FormApp/components/TextareaApp'
import style from './CreateFormComment.module.scss'

interface CREATEFORMCOMMENTPROPS {
}

const CreateFormComment = ({ }: CREATEFORMCOMMENTPROPS) => {
  return <CreateFormCommentView />
}

const CreateFormCommentView = ({ }: CREATEFORMCOMMENTPROPS) => {
  return (
    <div className={style.createFormComment}>
      <p className={style.mainTitle}>Pregunta al profesor</p>
      <p>
        Este es un espacio creado para que puedas resolver tus dudas con el prfesor y ver las dudas que han tenido otros alumnos como tu.
      </p>
      <FormApp onSubmit={() => console.log('envío comentario')}>
        <TextareaApp labelID='Escribe un comentario' onChange={() => console.log('envío change')} maxLength={200} name={'comment'} />
        <div className={style.buttonContainer}>
        <div className={style.submitComment}>
          <ButtonApp labelID='Enviar' onClick={() => console.log('hola')} type='submit' buttonStyle='primary' />
        </div>
        </div>
      </FormApp>

    </div>
  )
}

export default CreateFormComment;