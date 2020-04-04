import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

interface IProps {
  openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo2.png" alt="logo" style={{marginRight: 10}}/>
            MM
        </Menu.Item>
        <Menu.Item name='Meetings' />
        <Menu.Item>
            <Button onClick={openCreateForm} positive content='Create Meeting' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
