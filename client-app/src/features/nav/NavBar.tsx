
import React from 'react';
import { Menu, Container, Button, Image, Dropdown} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import emptyProfile from "../../images/emptyProfile.png";

const NavBar: React.FC = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 8}}/>
            MeetingManager
        </Menu.Item>
        <Menu.Item name='Meetings'  as={NavLink} to='/meetings'/>
        <Menu.Item>
            <Button
             as={NavLink} to='/createMeeting'
            positive 
            content='Create Event' />
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

export default observer(NavBar);
