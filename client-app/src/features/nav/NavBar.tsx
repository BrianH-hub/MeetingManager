
import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import MeetingStore from '../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';
import emptyProfile from "../../images/emptyProfile.png";


const NavBar: React.FC = () => {
  const meetingStore = useContext(MeetingStore);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }}/>
            MeetingManager
        </Menu.Item>
        <Menu.Item name='Meetings' />
        <Menu.Item>
            <Button onClick={meetingStore.openCreateForm} positive content='Create meeting' />
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
