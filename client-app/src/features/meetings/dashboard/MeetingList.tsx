import React, { SyntheticEvent } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meeting';

interface IProps {
  meetings: IMeeting[];
  selectMeeting: (id: string) => void;
  deleteMeeting: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const MeetingList: React.FC<IProps> = ({
  meetings,
  selectMeeting,
  deleteMeeting,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {meetings.map(meeting => (
          <Item key={meeting.id}>
            <Item.Content>
              <Item.Header as='a'>{meeting.title}</Item.Header>
              <Item.Meta>{meeting.date}</Item.Meta>
              <Item.Description>
                <div>{meeting.description}</div>
                <div>
                  {meeting.city}, {meeting.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectMeeting(meeting.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                name = {meeting.id}
                loading={target === meeting.id && submitting}
                  onClick={(e) => deleteMeeting(e, meeting.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={meeting.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default MeetingList;
