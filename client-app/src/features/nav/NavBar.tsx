import React from 'react';
import { Menu, Container, Button, Dropdown, Image  } from 'semantic-ui-react';
import emptyProfile from "../../images/emptyProfile.png";

interface IProps {
  openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }}/>
            MeetingManager
        </Menu.Item>
        <Menu.Item name='Meetings' />
        <Menu.Item>
            <Button onClick={openCreateForm} positive content='Create Meeting' />
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
