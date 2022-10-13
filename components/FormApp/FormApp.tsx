import { Form, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { debounce } from 'lodash'
export interface FORMAPPPROPS {
  onSubmit?: Function
  children?: any
  validationSchema?: any
  initialValues?: Object
  onChange?: Function
}
/**
 * Función de componente principal de formulario
 * @param onSubmit Función que ejecuta el formulario en la llamada al sumbit
 * @param validationSchema Objecto de yup para validar el formulario
 * @param initialValues Valores iniciales del formulario los key tienen que coincidir con los name de los campos input
 * @returns
 */
const FormApp = ({
  onSubmit,
  children,
  validationSchema,
  initialValues
}: FORMAPPPROPS) => {
  const FormRef = useRef<HTMLFormElement>(null)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const _onSubmit = (values: any) => {
    setSubmitted(true)
    setMessage('')
    if (onSubmit) onSubmit(values)
  }

  const childrenWithExtraProp = (
    { errors, touched }: any,
    setFieldValue: Function
  ) => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        error:
          errors[child.props.name] && touched[child.props.name]
            ? errors[child.props.name]
            : null,
        onChange: setFieldValue
      })
    })
  }

  return (
    <div className='form-container'>
      <div hidden={!submitted} role='alert'>
        {message}
      </div>
      
      <Formik
        initialValues={initialValues || {}}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({values: initialValues})
          _onSubmit(values)
        }}
      >
        {({ errors, touched, setFieldValue, values }) => {
          return (
            <Form ref={FormRef}>
              {childrenWithExtraProp({ errors, touched }, setFieldValue)}
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default FormApp
