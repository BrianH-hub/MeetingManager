import React, { useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import MeetingStore from '../../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';

const MeetingList: React.FC = () => {
  const meetingStore = useContext(MeetingStore);
  const {meetingsByDate, selectMeeting, deleteMeeting, submitting, target} = meetingStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {meetingsByDate.map(meeting => (
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

export default observer(MeetingList);
