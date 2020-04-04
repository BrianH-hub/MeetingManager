import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import logo from "../../assets/images/mmIconBlackGry.png";

export const NavBar = () => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src={logo} alt="logo" style={{marginRight: '10px'}}/>
          MeetingManager
        </Menu.Item>

        <Menu.Item name="Meetings" />
        <Menu.Item name="Schedule" />
        <Menu.Item>
          <Button positive content="Create Meeting" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
