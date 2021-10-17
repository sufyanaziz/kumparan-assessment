import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import Card from "../components/Card";
import { getUsers } from "../store/actions/userActions";

const HomeContainer = styled.div`
  color: var(--dark);

  .home {
    &__header {
      font-size: 2rem;
      font-weight: bold;
      padding-bottom: 4px;
      margin-bottom: 12px;
      border-bottom: 2px solid var(--dark);
    }

    &__data {
    }

    &__link {
      color: unset;
      text-decoration: none;
    }
    &__card {
      margin-bottom: 12px;
      display: flex;
      height: 80px;
      cursor: pointer;
    }
    &__cardNumber {
      flex: 0.1;
      background: var(--mainColor);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: var(--light);
    }
    &__cardContent {
      flex: 1;
      background: var(--light);
      padding: 10px;

      p:nth-child(1) {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
`;

const Home = props => {
  const dispatch = useDispatch();

  const { userProps } = props;

  useEffect(() => {
    document.title = "Home Page (sufyan-kumparan-assessment)";
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Layout>
      <HomeContainer>
        <div className="home__header">
          <p>All User</p>
        </div>
        <div className="home__data">
          {userProps.loading ? (
            <p>Loading...</p>
          ) : (
            userProps.users.map((user, idx) => {
              return (
                <Link
                  key={user.id}
                  className="home__link"
                  to={`/user/${user.id}`}
                >
                  <Card className="home__card">
                    <div className="home__cardNumber">
                      <p>{idx + 1}</p>
                    </div>
                    <div className="home__cardContent">
                      <p>{user.name}</p>
                      <p>{user.username}</p>
                    </div>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </HomeContainer>
    </Layout>
  );
};

const mapStateToProps = state => ({
  userProps: state.users,
});

export default connect(mapStateToProps)(Home);
