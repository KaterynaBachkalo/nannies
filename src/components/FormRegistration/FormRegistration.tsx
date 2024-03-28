import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import css from "./FormRegistration.module.css";
import { ReactComponent as OpenEyeIcon } from "../../img/openeye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../img/closeeye.svg";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

interface IForms {
  name: string;
  email: string;
  password: string;
}

interface IProps {
  onClose: (value: boolean) => void;
}

const FormRegistration: FC<IProps> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required(`Enter name, please`),
    email: Yup.string()
      .email("Invalid email format")
      .required(`Enter email, please`),
    password: Yup.string()
      .required(`Enter password, please`)
      .min(8, `Min 8 characters`)
      .max(64, `Max 64 characters`),
  });

  const initialValues: IForms = { name: "", email: "", password: "" };

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      const signUp = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(signUp.user, {
        displayName: values.name,
      });
      const user = signUp.user;

      dispatch(
        setUser({
          id: user.uid,
          email: values.email,
          name: values.name,
        })
      );
      navigate("/nannies");
    } catch (error) {
      console.error(error);
    }

    resetForm();

    toast.success(`Success registration`);

    onClose(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.inputWrap}>
          <div className={css.wrap}>
            <Field name="name" placeholder="Name" className={css.input} />
            <ErrorMessage
              name="email"
              component="div"
              className={css.errormessage}
            />
          </div>

          <div className={css.wrap}>
            <Field name="email" placeholder="Email" className={css.input} />
            <ErrorMessage
              name="email"
              component="div"
              className={css.errormessage}
            />
          </div>

          <div className={css.wrap}>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={css.input}
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              {!showPassword ? (
                <ClosedEyeIcon className={css.iconeye} />
              ) : (
                <OpenEyeIcon className={css.iconeye} />
              )}
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={css.errormessage}
            />
          </div>
        </div>
        <button type="submit" className={css.button}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default FormRegistration;