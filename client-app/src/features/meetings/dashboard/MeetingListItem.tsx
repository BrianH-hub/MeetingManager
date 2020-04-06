import React from 'react';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IMeeting } from '../../../app/models/meeting';
import {format} from 'date-fns';

const MeetingListItem: React.FC<{ meeting: IMeeting }> = ({ meeting }) => {
    return (
        <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src='/assets/user.png' />
              <Item.Content>
                <Item.Header as='a'>{meeting.title}</Item.Header>
                <Item.Description>Hosted by Bob</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
        <Icon name='clock' /> {format(meeting.date, 'h:mm a')}
          <Icon name='marker' /> {meeting.venue}, {meeting.city}
        </Segment>
        <Segment secondary>Attendees will go here</Segment>
        <Segment clearing>
          <span>{meeting.description}</span>
          <Button
            as={Link}
            to={`/meetings/${meeting.id}`}
            floated='right'
            content='View'
            color='blue'
          />
        </Segment>
      </Segment.Group>
    );
};
export default MeetingListItem;