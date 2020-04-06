import React, { SyntheticEvent, useEffect, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meeting';
import MeetingList from './MeetingList';
import MeetingDetails from '../details/MeetingDetails';
import MeetingForm from '../form/MeetingForm';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

// interface IProps {
//   meetings: IMeeting[];
//   selectMeeting: (id: string) => void;
//   selectedMeeting: IMeeting | null;
//   editMode: boolean;
//   setEditMode: (editMode: boolean) => void;
//   setSelectedMeeting: (meeting: IMeeting | null) => void;
//   createMeeting: (meeting: IMeeting) => void;
//   editMeeting: (meeting: IMeeting) => void;
//   deleteMeeting: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
//   submitting: boolean;
//   target: string;
// }
//no longer required code?

const MeetingDashboard: React.FC = () =>{
  const rootStore = useContext(RootStoreContext);
  const {loadMeetings, loadingInitial} = rootStore.meetingStore;
  useEffect(() => {
    loadMeetings();
  }, [loadMeetings]);

  if (loadingInitial)
    return <LoadingComponent content='Loading meetings' />;

  return (
    <Grid>
      <Grid.Column width={11}>
        <MeetingList />
      </Grid.Column>
      <Grid.Column width={8}>
        <h2>Meeting filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingDashboard);
