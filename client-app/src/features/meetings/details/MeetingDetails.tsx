import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meeting';

interface IProps {
    meeting: IMeeting;
    setEditMode: (editMode: boolean) => void;
    setSelectedMeeting: (meeting: IMeeting | null) => void;
}

const MeetingDetails: React.FC<IProps> = ({meeting, setEditMode, setSelectedMeeting}) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${meeting.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{meeting.title}</Card.Header>
        <Card.Meta>
          <span>{meeting.date}</span>
        </Card.Meta>
        <Card.Description>
          {meeting.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />
            <Button onClick={() => setSelectedMeeting(null)} basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default MeetingDetails;
