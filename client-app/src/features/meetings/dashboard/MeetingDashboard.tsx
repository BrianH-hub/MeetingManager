import React, { SyntheticEvent, useEffect, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import MeetingList from './MeetingList';
import { observer } from 'mobx-react-lite';
import MeetingStore from '../../../app/stores/meetingStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const MeetingDashboard: React.FC = () => {
  const meetingStore = useContext(MeetingStore);
  useEffect(() => {
    meetingStore.loadMeetings();
  }, [meetingStore]);

  if (meetingStore.loadingInitial)
    return <LoadingComponent content='Loading meetings' />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingList />
      </Grid.Column>
      <Grid.Column width={6}>
      <h2>Meeting filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingDashboard);
