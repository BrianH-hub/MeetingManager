import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import MeetingStore from '../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';

const NavBar: React.FC = () => {
  const meetingStore = useContext(MeetingStore);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo2.png" alt="logo" style={{marginRight: 10}}/>
            MM
        </Menu.Item>
        <Menu.Item name='Meetings' />
        <Menu.Item>
            <Button onClick={meetingStore.openCreateForm} positive content='Create meeting' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
