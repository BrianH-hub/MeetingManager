import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";

const HomePage = () => {
  const { user, isLoggedIn } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  const rootStore = useContext(RootStoreContext);
  return <div></div>;
};
export default HomePage;
