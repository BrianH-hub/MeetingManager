import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import mmIcon from './images/mmIconBlackGry.png';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios.get('http://localhost:5000/api/values').then(response => {
      this.setState({
        values: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          {/* <Icon name='users' /> */}
          <img src={mmIcon} alt=""/>
          <Header.Content>MeetingManager</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
