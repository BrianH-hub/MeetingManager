import React, { useState, useEffect, Fragment, Component } from "react";
import { Header, List, Container } from "semantic-ui-react";
import axios from "axios";
import NavBar from "../../features/nav/NavBar";

class App extends Component {

      state = {meetings: [
          { id: 1, title: "test1" },
          { id: 2, title: "test2" },
        ],
      };

  componentDidMount() {
    axios.get("http://localhost:5000/api/meetings").then((response) => {
      this.setState({
        meetings: response.data,
      });

    });
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <Container style={{ marginTop: "5em" }}>
          <Header as="h2">
            <Header.Content>MeetingManager</Header.Content>
          </Header>

        </Container>
      </Fragment>
    );
  }
}

export default App;
