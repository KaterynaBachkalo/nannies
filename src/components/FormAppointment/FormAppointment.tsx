import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { FC } from "react";
import { ReactComponent as Icontime } from "../../img/time.svg";
import { toast } from "react-toastify";
import * as Yup from "yup";
import css from "./FormAppointment.module.css";

interface IForms {
  address: string;
  number: string;
  age: string;
  time: string;
  email: string;
  name: string;
  comment: string;
}

interface IProps {
  onClose: (value: boolean) => void;
}

const FormAppointment: FC<IProps> = ({ onClose }) => {
  const validationSchema = Yup.object({
    address: Yup.string().required(`Enter address, please`),
    number: Yup.number().required(`Enter phone number, please`),
    age: Yup.number()
      .required(`Enter age, please`)
      .min(1, `Min 1 characters`)
      .max(2, `Max 2 characters`),
    time: Yup.string().required(`Check time, please`),
    email: Yup.string().email("Invalid email").required(`Enter email, please`),
    name: Yup.string(),
    comment: Yup.string(),
  });

  const initialValues: IForms = {
    address: "",
    number: "",
    age: "",
    time: "",
    email: "",
    name: "",
    comment: "",
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    toast.success(``);
    onClose(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div>
          <div className={css.wrapInputShort}>
            <div className={css.wrap}>
              <Field
                type="text"
                name="address"
                placeholder="Address"
                className={css.inputShort}
              />
              <ErrorMessage
                name="address"
                component="div"
                className={css.errormessage}
              />
            </div>

            <div className={css.wrap}>
              <label htmlFor="number" className={css.labelNumber}>
                +380
              </label>
              <Field
                type="number"
                name="number"
                className={`${css.inputShort} ${css.number}`}
              />
              <ErrorMessage
                name="number"
                component="div"
                className={css.errormessage}
              />
            </div>

            <div className={css.wrap}>
              <Field
                type="number"
                name="age"
                placeholder="Child's age"
                className={css.inputShort}
              />
              <ErrorMessage
                name="age"
                component="div"
                className={css.errormessage}
              />
            </div>

            <div className={css.wrap}>
              <Field
                type="text"
                name="time"
                placeholder="Meeting time"
                className={css.inputShort}
              />
              <Icontime className={css.time} />
              <ErrorMessage
                name="time"
                component="div"
                className={css.errormessage}
              />
            </div>
          </div>

          <div className={css.wrapInput}>
            <div className={css.wrap}>
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.errormessage}
              />
            </div>

            <div className={css.wrap}>
              <Field
                type="text"
                name="name"
                placeholder="Father's or mother's name"
                className={css.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={css.errormessage}
              />
            </div>

            <div className={css.wrap}>
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={css.textarea}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={css.errormessage}
              />
            </div>
          </div>
        </div>
        <button type="submit" className={css.button}>
          Send
        </button>
      </Form>
    </Formik>
  );
};

export default FormAppointment;
