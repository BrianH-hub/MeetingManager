import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, isLoggedIn } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;
    const token = window.localStorage.getItem('jwt');

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image
                        size="massive"
                        src="/assets/logo.png"
                        alt="logo"
                        style={{ marginBottom: 12 }}
                    />
                    MeetingManager
                </Header>
                {isLoggedIn && user && token ? (
                    <Fragment>
                        <Header
                            as="h2"
                            inverted
                            content={`Welcome back ${user.displayName}`}
                        />
                        <Button
                            as={Link}
                            to="/activities"
                            size="huge"
                            content="Go to Meetings!"
                            inverted
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <Header
                            as="h2"
                            inverted
                            content="Welcome to MeetingManager"
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

export default HomePage;
