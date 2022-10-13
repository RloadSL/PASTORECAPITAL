import ButtonApp from 'components/ButtonApp'
import FormApp from 'components/FormApp'
import TextareaApp from 'components/FormApp/components/TextareaApp'
import style from './CreateFormComment.module.scss'

interface CREATEFORMCOMMENTPROPS {
  formCommentStyle?: 'default' | 'minified'
}

const CreateFormComment = ({ formCommentStyle }: CREATEFORMCOMMENTPROPS) => {
  return <CreateFormCommentView formCommentStyle={formCommentStyle} />
}

const CreateFormCommentView = ({ formCommentStyle = 'default' }: CREATEFORMCOMMENTPROPS) => {
  return (
    <div className={`${style.createFormComment} ${style[formCommentStyle]}`}>
      {formCommentStyle === 'default' ? (
        <div className={style.textContent}>
          <p className={style.mainTitle}>Pregunta al profesor</p>
          <p>
            Este es un espacio creado para que puedas resolver tus dudas con el prfesor y ver las dudas que han tenido otros alumnos como tu.
          </p>
        </div>
      ) : null}
      <FormApp onSubmit={() => console.log('envío comentario')}>
        <TextareaApp labelID={formCommentStyle === 'default' ? 'Escribe un comentario' : 'Escribe tu respuesta'} onChange={() => console.log('envío change')} maxLength={200} name={'comment'} />
        <div className={style.buttonContainer}>
          <div className={style.submitComment}>
            <ButtonApp labelID='Enviar' onClick={() => console.log('hola')} type='submit' buttonStyle='primary' size={formCommentStyle === 'minified' ? 'small' : 'default'}/>
          </div>
        </div>
      </FormApp>
    </div>
  )
}

export default CreateFormComment;