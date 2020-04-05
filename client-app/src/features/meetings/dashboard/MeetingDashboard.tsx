import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import MeetingList from './MeetingList';
import MeetingDetails from '../details/MeetingDetails';
import MeetingForm from '../form/MeetingForm';
import { observer } from 'mobx-react-lite';
import MeetingStore from '../../../app/stores/meetingStore';

const MeetingDashboard: React.FC = () => {
  const meetingStore = useContext(MeetingStore);
  const {editMode, selectedMeeting} = meetingStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedMeeting && !editMode && (
          <MeetingDetails />
        )}
        {editMode && (
          <MeetingForm
            key={(selectedMeeting && selectedMeeting.id) || 0}
            meeting={selectedMeeting!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingDashboard);
