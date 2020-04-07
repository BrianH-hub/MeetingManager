import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meeting';
import {format} from 'date-fns';

const MeetingDetailedInfo: React.FC<{meeting: IMeeting}> = ({meeting}) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{meeting.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
          <span>{format(meeting.date, 'eeee do MMMM')} at {format(meeting.date!, 'h:mm a')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {meeting.venue}, {meeting.city}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default MeetingDetailedInfo;
