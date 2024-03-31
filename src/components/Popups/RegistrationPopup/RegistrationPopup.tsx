import React, { FC } from "react";
import css from "./RegistrationPopup.module.css";
import FormRegistration from "../../Forms/FormRegistration/FormRegistration";

interface IProps {
  onClose: (value: boolean) => void;
}

const RegistrationPopup: FC<IProps> = ({ onClose }) => {
  return (
    <div>
      <div>
        <p className={css.subtitle}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>
      <FormRegistration onClose={onClose} />
    </div>
  );
};

export default RegistrationPopup;
