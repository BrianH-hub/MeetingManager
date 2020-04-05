import React, { useContext, useEffect  } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import MeetingStore from '../../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

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
    }, [loadMeeting, match.params.id]);
  
    if (loadingInitial || !meeting) return <LoadingComponent content='Loading meeting...' />

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${meeting!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{meeting!.title}</Card.Header>
        <Card.Meta>
          <span>{meeting!.date}</span>
        </Card.Meta>
        <Card.Description>
          {meeting!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button as={Link} to={`/manage/${meeting.id}`} basic color='blue' content='Edit' />
            <Button onClick={() => history.push('/meetings')} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(MeetingDetails);

