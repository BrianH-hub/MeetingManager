import React from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meeting';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';

const meetingImageStyle = {
  filter: 'brightness(30%)'
};

const meetingImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const MeetingDetailedHeader: React.FC<{meeting: IMeeting}> = ({meeting}) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${meeting.category}.jpg`}
          fluid
          style={meetingImageStyle}
        />
        <Segment style={meetingImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={meeting.title}
                  style={{ color: 'white' }}
                />
                <p>{format(meeting.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Join Meeting</Button>
        <Button>Cancel attendance</Button>
        <Button as={Link} to={`/manage/${meeting.id}`} color='orange' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(MeetingDetailedHeader);
