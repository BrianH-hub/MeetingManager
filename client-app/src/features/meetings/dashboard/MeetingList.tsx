import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import MeetingStore from '../../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';
import MeetingListItem from './MeetingListItem';
import {format} from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';

const MeetingList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { meetingsByDate } = rootStore.meetingStore;
  return (
    <Fragment>
      {meetingsByDate.map(([group, meetings]) => (
        <Fragment key={group}>
          <Label size='large' color='blue'>
            {group}
          </Label>
          <Item.Group divided>
            {meetings.map(meeting => (
              <MeetingListItem key={meeting.id} meeting={meeting} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(MeetingList);
