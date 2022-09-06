
import ButtonApp from 'components/ButtonApp';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

export interface FORMAPPPROPS {
  onSubmit: Function,
  children: any,
  validationSchema?: any,
  initialValues: Object
}
/**
 * Función de componente principal de formulario
 * @param  onSubmit Función que ejecuta el formulario en la llamada al sumbit
 * @param  validationSchema Objecto de yup para validar el formulario 
 * @param initialValues Valores iniciales del formulario los key tienen que coincidir con los name de los campos input
 * @returns 
 */
const FormApp = ({ onSubmit, children, validationSchema, initialValues }: FORMAPPPROPS) => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const _onSubmit = (values: any) => {
    setSubmitted(true)
    setMessage('')
    onSubmit(values)
  }

  return (

    <div className="form-container">
      <div hidden={!submitted} role="alert">
        {message}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => _onSubmit(values)}
      >
        <Form>
          {children}
        </Form>
      </Formik>
    </div>
  )
}

export default FormApp