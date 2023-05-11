import ButtonApp from "components/ButtonApp";
import InputFormikApp from "components/FormApp/components/InputFormikApp";
import TextareaFormikApp from "components/FormApp/components/TextareaFormikApp ";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import style from "./tools.module.scss";
import * as yup from "yup";
import Loading from "components/Loading";
import systemRepository from "infrastructure/repositories/system.repository";
import { setLoading } from "ui/redux/slices/system/system.slice";

const Tools: NextPage = () => {
  const intl = useIntl();
  const [result, setState] = useState(0);
  const [initialValues, setInitialValues] = useState<{
    ["input-1"]: number;
    ["input-2"]: number;
    ["input-3"]?: number;
    ["input-4"]?: number;
  }>({
    ["input-1"]: 0,
    ["input-2"]: 0,
    ["input-3"]: 0,
    ["input-4"]: 0
  });

  const validation = useRef(
    yup.object().shape({
      ["input-1"]: yup
        .number()
        .min(0.99, intl.formatMessage({ id: "page.tools.calc.invalid.capital" }))
        .required(intl.formatMessage({ id: "forms.errors.errorRequired" })),
      ["input-2"]: yup
        .number()
        .min(0.99, intl.formatMessage({ id: "page.tools.calc.invalid.percent" }))
        .required(intl.formatMessage({ id: "forms.errors.errorRequired" })),
      ["input-4"]: yup
        .number()
        .min(0.99, intl.formatMessage({ id: "page.tools.calc.invalid.percent" }))
        .required(intl.formatMessage({ id: "forms.errors.errorRequired" }))
    })
  ).current;

  const onSubmit = async (data: any) => {
    const result = (data["input-1"] * (data["input-2"] * 0.01)) / (data["input-4"] * 0.01);
    setState(result);
  };

  return (
    <div className={style.tools}>
      <header>
        <p className="small-caps">
          <FormattedMessage id="page.tools.calc.smallCaps" />
        </p>
      </header>
      <div className={style.cardContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, status }) => (
            <Form>
              <div className={style.cardContainer_top}>
                <h1 className={`${style.topTitle} main-title`}>
                  <FormattedMessage id="page.tools.calc.title" />
                </h1>
              </div>
              <div className={style.cardContainer_form}>
                <div className={style.inputBlock}>
                  <label>
                    <span className={style.label}>
                      <FormattedMessage id="page.tools.calc.input1" />
                    </span>
                    <Field type="number" name="input-1" />
                  </label>
                  <small>{errors["input-1"]}</small>
                </div>
                <div className={style.inputBlock}>
                  <label>
                    <span className={style.label}>
                      <FormattedMessage id="page.tools.calc.input2" />
                    </span>
                    <Field type="number" name="input-2"></Field>
                  </label>
                  <small>{errors["input-2"]}</small>
                </div>
                <div className={style.inputBlock}>
                  <label>
                    <span className={style.label}>
                      <FormattedMessage id="page.tools.calc.input3" />
                    </span>
                    <Field
                      disabled
                      value={values["input-1"] * (values["input-2"] * 0.01)}
                      type="number"
                      name="input-3"
                    ></Field>
                  </label>
                  <small>{errors["input-3"]}</small>
                </div>
                <div className={style.inputBlock}>
                  <label>
                    <span className={style.label}>
                      <FormattedMessage id="page.tools.calc.input4" />
                    </span>
                    <Field type="number" name="input-4" />
                  </label>
                  <small>{errors["input-4"]}</small>
                </div>
              </div>
              <div className={style.cardContainer_result}>
                <span className={style.label}>
                  <FormattedMessage id="page.tools.calc.result" />:
                </span>
                <span className={style.cardContainer_result__qty}> {result}</span>
              </div>
              <div className={style.buttonContainer}>
                <ButtonApp buttonStyle="primary" type="submit" labelID="page.tools.calc.submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Tools;
