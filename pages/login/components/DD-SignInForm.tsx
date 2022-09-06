import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

export interface SIGNINFORM{
  onSubmit: Function
} 

const SignInForm = ({onSubmit}: SIGNINFORM) => {
  const [message, setMessage] = useState(''); 
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (value) => {
      setMessage('Form submitted');
      setSubmitted(true);
      onSubmit(value)
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
      password: yup.string().trim().min(6).required('Password is Required'),
    }),
  });

  return (
    <div className="">
      <div hidden={!submitted} className="" role="alert">
        {message}
      </div>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            className=""
            placeholder="john@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
          Password
          </label>
          <input
            name="password"
            className=""
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}

export default SignInForm