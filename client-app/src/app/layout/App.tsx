import React, { useState, useEffect, Fragment, Component } from "react";
import { Header, List, Container } from "semantic-ui-react";
import axios from "axios";
import NavBar from "../../features/nav/NavBar";
import { MeetingDashboard } from "../../features/nav/meetings/dashboard/MeetingDashboard";

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((response) => {
      this.setState({
        values: response.data,
      });
    });
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <Container style = {{marginTop: '7em'}}>
          
          <MeetingDashboard />
          <List>
            {this.state.values.map((value: any) => (
              <List.Item key={value.id}>{value.name}</List.Item>
            ))}
          </List>
        </Container>
      </Fragment>
    );
  }
}

export default App;
