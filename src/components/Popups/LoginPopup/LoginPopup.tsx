import React, { FC } from "react";
import css from "./LoginPopup.module.css";
import FormLogin from "../../Forms/FormLogin/FormLogin";

interface IProps {
  onClose: (value: boolean) => void;
}

const LoginPopup: FC<IProps> = ({ onClose }) => {
  return (
    <div>
      <div>
        <p className={css.subtitle}>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
      </div>
      <FormLogin onClose={onClose} />
    </div>
  );
};

export default LoginPopup;
