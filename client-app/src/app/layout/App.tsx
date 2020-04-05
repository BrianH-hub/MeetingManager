import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import MeetingDashboard from "../../features/meetings/dashboard/MeetingDashboard";
import LoadingComponent from './LoadingComponent'
import MeetingStore from "../stores/meetingStore";
import {observer} from 'mobx-react-lite';

const App = () => {

  const meetingStore = useContext(MeetingStore)

  useEffect(() => {
    meetingStore.loadMeetings();
  }, [meetingStore]);

  if (meetingStore.loadingInitial) return <LoadingComponent content='Loading meetings' />
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <MeetingDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
