import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  border: none;
  background: ${props =>
    props.buttonType === "primary"
      ? "var(--mainColor)"
      : props.buttonType === "secondary"
      ? "#F08A5D"
      : props.buttonType === "danger"
      ? "#B83B5E"
      : props.disabled
      ? "gray"
      : "var(--mainColor)"};
  color: var(--light);
  padding: 10px 14px;
  border-radius: 6px;
  font-weight: bold;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const Button = ({ value, type, ...rest }) => {
  return (
    <ButtonStyled buttonType={type} {...rest}>
      {value}
    </ButtonStyled>
  );
};

export default Button;
