import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";

const HomePage = () => {
  const { user, isLoggedIn } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  const rootStore = useContext(RootStoreContext);
 return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            
          />

        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header />
            <Button >
              
            </Button>
          </Fragment>
        ) : (
          <Fragment>
          <Header as='h2' inverted content={`Meeting Manager`} />
          <Button >
            Login
          </Button>
          <Button >
            Register
          </Button>
        </Fragment>
        )}
      </Container>
    </Segment>
  );
};
export default HomePage;
