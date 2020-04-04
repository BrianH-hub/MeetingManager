import React from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import logo from "../../assets/images/mmIconBlackGry.png";
import emptyProfile from "../../assets/images/emptyProfileBlue.png";

export const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src={logo} alt="logo" style={{ marginRight: "10px" }} />
          MeetingManager
        </Menu.Item>

        <Menu.Item name="Meetings" />
        <Menu.Item name="Schedule(placeholder)" />
        <Menu.Item>
          <Button positive content="Create Meeting" />
        </Menu.Item>

        <Menu.Item position="right">
          <Image avatar spaced="right" src={emptyProfile} />
          <Dropdown pointing="top left" text={"userName"}>
            <Dropdown.Menu>
              <Dropdown.Item text="My profile" />
              <Dropdown.Item text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
