import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Container, Button, Dropdown, Image  } from 'semantic-ui-react';
import emptyProfile from "../../images/emptyProfile.png";
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 8 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Meetings' as={NavLink} to='/activities' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/createActivity'
            positive
            content='Create Meeting'
          />
        </Menu.Item>
        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
