import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IMeeting } from '../models/meeting';
import NavBar from '../../features/nav/NavBar';
import MeetingDashboard from '../../features/meetings/dashboard/MeetingDashboard';

const App = () => {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<IMeeting | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedMeeting(null);
    setEditMode(true);
  }

  const handleCreateMeeting = (meeting: IMeeting) => {
    setMeetings([...meetings, meeting]);
    setSelectedMeeting(meeting);
    setEditMode(false);
  }

  const handleEditMeeting = (meeting: IMeeting) => {
    setMeetings([...meetings.filter(a => a.id !== meeting.id), meeting])
    setSelectedMeeting(meeting);
    setEditMode(false);
  }

  const handleDeleteMeeting = (id: string) => {
    setMeetings([...meetings.filter(a => a.id !== id)])
  }

  const handleSelectMeeting = (id: string) => {
    setSelectedMeeting(meetings.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  useEffect(() => {
    axios
      .get<IMeeting[]>('http://localhost:5000/api/meetings')
      .then(response => {
        let meetings: IMeeting[] = [];
        response.data.forEach(meeting => {
          meeting.date = meeting.date.split('.')[0]
          meetings.push(meeting);
        })
        setMeetings(meetings);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <MeetingDashboard
          meetings={meetings}
          selectMeeting={handleSelectMeeting}
          selectedMeeting={selectedMeeting}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedMeeting={setSelectedMeeting}
          createMeeting={handleCreateMeeting}
          editMeeting={handleEditMeeting}
          deleteMeeting={handleDeleteMeeting}
        />
      </Container>
    </Fragment>
  );
};

export default App;
