import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { RootStoreContext } from '../../app/stores/rootStore';
import RegisterForm from '../user/RegisterForm';
import LoginForm from '../user/LoginForm';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 15 }}
          />
          Meeting Manager
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`User ${user.displayName} Returning`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Meetings!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome to Meeting Manager`}
            />
            <Button
              onClick={() => openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage
