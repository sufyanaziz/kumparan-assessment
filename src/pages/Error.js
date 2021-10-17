import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";

const ErrorContainer = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--dark);

  h3 {
    margin: 10px 0 5px 0;
  }

  h1,
  a {
    color: var(--mainColor);
  }
`;

const Error = () => {
  useEffect(() => {
    document.title = "404 - Page is doesn't exist";
  }, []);
  return (
    <Layout>
      <ErrorContainer>
        <h1>404</h1>
        <h3>Page is doesn't exist</h3>
        <p>
          Go to, <Link to="/">main page</Link>
        </p>
      </ErrorContainer>
    </Layout>
  );
};

export default Error;
