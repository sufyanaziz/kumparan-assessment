import React, { useEffect } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const ModalContainer = styled.div`
  .modal {
    position: relative;

    &__backdrop {
      position: absolute;
      background: rgba(0, 0, 0, 0.75);
      width: 100vw;
      height: 100vh;
      top: ${props => props.pageHeight}px;
      right: 0;
    }

    &__icon {
      position: fixed;
      z-index: 3;
      right: 4%;
      top: 5%;
      color: var(--light);
      font-size: 40px;
      cursor: pointer;
    }

    &__content {
      background: white;
      position: absolute;
      z-index: 2;
      top: ${props => props.pageHeight}px;
      left: 50%;
      transform: translate(-50%, 20%);
      border-radius: 4px;
      height: 75vh;
      width: 80vw;
      box-shadow: 0 0 3 rgba(0, 0, 0, 0.5);
    }
  }
`;

const Modal = ({ onCloseModal, open, children }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  const scrollY = window.scrollY;

  if (!open) return <React.Fragment />;
  return (
    <ModalContainer pageHeight={scrollY}>
      <div className="modal__backdrop" onClick={onCloseModal} />
      <div className="modal__icon" onClick={onCloseModal}>
        <IoMdClose />
      </div>
      <div className="modal__content">{children}</div>
    </ModalContainer>
  );
};

export default Modal;
