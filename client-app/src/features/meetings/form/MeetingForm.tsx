import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meeting';
import {v4 as uuid} from 'uuid';
import MeetingStore from '../../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  meeting: IMeeting;
}

const MeetingForm: React.FC<IProps> = ({
  meeting: initialFormState,
}) => {
  const meetingStore = useContext(MeetingStore);
  const { createMeeting, editMeeting, submitting, cancelFormOpen } = meetingStore;
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };

  const [meeting, setMeeting] = useState<IMeeting>(initializeForm);

  const handleSubmit = () => {
    if (meeting.id.length === 0) {
      let newMeeting = {
        ...meeting,
        id: uuid()
      };
      createMeeting(newMeeting);
    } else {
      editMeeting(meeting);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setMeeting({ ...meeting, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder='Title'
          value={meeting.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='Description'
          value={meeting.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
          value={meeting.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={meeting.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder='City'
          value={meeting.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name='venue'
          placeholder='Venue'
          value={meeting.venue}
        />
        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={cancelFormOpen}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(MeetingForm);
