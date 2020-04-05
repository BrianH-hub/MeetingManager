import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meeting';
import MeetingStore from '../../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';

const MeetingDetails: React.FC = () => {
  const meetingStore = useContext(MeetingStore);
  const { selectedMeeting: meeting, openEditForm, cancelSelectedMeeting } = meetingStore;
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
            <Button onClick={() => openEditForm(meeting!.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedMeeting} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(MeetingDetails);

