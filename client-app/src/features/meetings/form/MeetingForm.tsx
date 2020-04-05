import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IMeeting } from '../../../app/models/meeting';
import {v4 as uuid} from 'uuid';
import MeetingStore from '../../../app/stores/meetingStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';


interface DetailParams {
  id: string;
}

const MeetingForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const meetingStore = useContext(MeetingStore);
  const {
    createMeeting,
    editMeeting,
    submitting,
    meeting: initialFormState,
    loadMeeting,
    clearMeeting
  } = meetingStore;

  const [meeting, setMeeting] = useState<IMeeting>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (match.params.id && meeting.id.length === 0) {
      loadMeeting(match.params.id).then(
        () => initialFormState && setMeeting(initialFormState)
      );
    }
    return () => {
      clearMeeting()
    }
  }, [loadMeeting, clearMeeting, match.params.id, initialFormState, meeting.id.length]);


  const handleSubmit = () => {
    if (meeting.id.length === 0) {
      let newMeeting = {
        ...meeting,
        id: uuid()
      };
      createMeeting(newMeeting).then(() => history.push(`/meetings/${newMeeting.id}`))
    } else {
      editMeeting(meeting).then(() => history.push(`/meetings/${meeting.id}`));
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
          onClick={() => history.push('/meetings')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(MeetingForm);
