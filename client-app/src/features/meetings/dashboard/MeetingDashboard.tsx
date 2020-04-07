import React, { SyntheticEvent, useEffect, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import MeetingList from './MeetingList';
import { observer } from 'mobx-react-lite';
import MeetingStore from '../../../app/stores/meetingStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const MeetingDashboard: React.FC = () => {
const rootStore = useContext(RootStoreContext);
  const {loadMeetings, loadingInitial} = rootStore.meetingStore;

  useEffect(() => {
    loadMeetings();
  }, [loadMeetings]);

  if (loadingInitial)
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
