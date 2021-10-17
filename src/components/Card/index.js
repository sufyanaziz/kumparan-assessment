import React from "react";

import styled from "styled-components";

const CardContainer = styled.div`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.45);
`;

const Card = ({ children, ...rest }) => {
  return <CardContainer {...rest}>{children}</CardContainer>;
};

export default Card;
