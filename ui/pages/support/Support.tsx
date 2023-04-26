import ButtonApp from "components/ButtonApp";
import InputFormikApp from "components/FormApp/components/InputFormikApp";
import TextareaFormikApp from "components/FormApp/components/TextareaFormikApp ";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import React from "react";
import { FormattedMessage } from "react-intl";
import style from "./support.module.scss";

interface SupportProps {}

const Support: NextPage = ({}: SupportProps) => {
  const initialValues: {
    name: string;
    email: string;
    problem: string;
  } = {
    name: "",
    email: "",
    problem: ""
  };
  return (
    <div className={style.support}>
      <header>
        <div className={style.info}>
          <h1 className={`${style.topTitle} main-title`}>
            <FormattedMessage id="page.support.title" />
          </h1>
          <p>
            <FormattedMessage id="page.support.text" />
          </p>
        </div>
      </header>
      <div className={style.maxContainer}>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={() => console.log("enviar")}
        >
          {({ values, errors, touched }) => (
            <Form>
              <InputFormikApp labelID="Nombre" type="text" name="name" />
              <InputFormikApp labelID="Email" type="email" name="email" />
              <TextareaFormikApp labelID="Describe qué problema tienes" name="problem" />
              <div className={style.buttonContainer}>
                <ButtonApp buttonStyle="secondary" type="submit" labelID="btn.send" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Support;
