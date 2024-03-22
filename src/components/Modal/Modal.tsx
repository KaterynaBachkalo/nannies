import React, { FC, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import useCloseModals from "../../services/closeModals";
import closeIcon from "../../img/close.svg";

const modalRoot: Element | null = document.querySelector("#root-modal");

interface IProps {
  onClose: (value: boolean) => void;
  children: ReactNode;
}

const RegistrationPopup: FC<IProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useCloseModals(onClose, modalRef);

  return (
    modalRoot &&
    createPortal(
      <div className={css.backdrop}>
        <div className={css.container}>
          <div
            className={css.modal}
            ref={modalRef}
            onClick={(event) => event.stopPropagation()}
          >
            <button className={css.btnClose} onClick={() => onClose(false)}>
              <img src={closeIcon} width={24} alt="Close" />
            </button>
            <div>{children}</div>
          </div>
        </div>
      </div>,

      modalRoot
    )
  );
};

export default RegistrationPopup;
