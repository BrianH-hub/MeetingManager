import React, { useContext, useEffect  } from 'react';
import { Grid } from 'semantic-ui-react';
import MeetingStore from '../../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MeetingDetailedHeader from './MeetingDetailedHeader';
import MeetingDetailedInfo from './MeetingDetailedInfo';
import MeetingDetailedChat from './MeetingDetailedChat';
import MeetingDetailedSidebar from './MeetingDetailedSidebar';

interface DetailParams {
  id: string;
}

const MeetingDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const meetingStore = useContext(MeetingStore);
  const { meeting, loadMeeting, loadingInitial} = meetingStore;

    useEffect(() => {
      loadMeeting(match.params.id);
    }, [loadMeeting, match.params.id, history]);
  

    if (loadingInitial) return <LoadingComponent content='Loading meeting...' />;

    if (!meeting) return <h2>Meeting not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <MeetingDetailedHeader meeting={meeting} />
        <MeetingDetailedInfo meeting={meeting} />
        <MeetingDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <MeetingDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingDetails);

