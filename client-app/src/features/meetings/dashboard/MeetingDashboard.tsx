import React, { SyntheticEvent } from 'react';
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

  
} = ({
  meetings,
  selectMeeting,
  selectedMeeting,
  editMode,
  setEditMode,
  setSelectedMeeting,
  createMeeting,
  editMeeting,
  deleteMeeting,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingList
          meetings={meetings}
          selectMeeting={selectMeeting}
          deleteMeeting={deleteMeeting}
          submitting = {submitting}
          target = {target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedMeeting && !editMode && (
          <MeetingDetails
            meeting={selectedMeeting}
            setEditMode={setEditMode}
            setSelectedMeeting={setSelectedMeeting}
          />
        )}
        {editMode && (
          <MeetingForm
            key={(selectedMeeting && selectedMeeting.id) || 0}
            setEditMode={setEditMode}
            meeting={selectedMeeting!}
            createMeeting={createMeeting}
            editMeeting={editMeeting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default MeetingDashboard;
