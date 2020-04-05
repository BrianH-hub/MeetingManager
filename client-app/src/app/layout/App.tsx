import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IMeeting } from "../models/meeting";
import NavBar from "../../features/nav/NavBar";
import MeetingDashboard from "../../features/meetings/dashboard/MeetingDashboard";
import agent from "../api/agent";
//import LoadingComponent from './LoadingComponent';

const App = () => {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<IMeeting | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleOpenCreateForm = () => {
    setSelectedMeeting(null);
    setEditMode(true);
  };

  const handleCreateMeeting = (meeting: IMeeting) => {
    setSubmitting(true);
    agent.Meetings.create(meeting).then(() => {
      setMeetings([...meetings, meeting]);
      setSelectedMeeting(meeting);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleEditMeeting = (meeting: IMeeting) => {
    setSubmitting(true);
    agent.Meetings.update(meeting).then(() => {
      setMeetings([...meetings.filter((a) => a.id !== meeting.id), meeting]);
      setSelectedMeeting(meeting);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleDeleteMeeting = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name);
    agent.Meetings.delete(id).then(() => {
      setMeetings([...meetings.filter((a) => a.id !== id)]);
    }).then(() => setSubmitting(false));
  };

  const handleSelectMeeting = (id: string) => {
    setSelectedMeeting(meetings.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  useEffect(() => {
    agent.Meetings.list().then((response) => {
      let meetings: IMeeting[] = [];
      response.forEach((meeting) => {
        meeting.date = meeting.date.split(".")[0];
        meetings.push(meeting);
      });
      setMeetings(meetings);
    }).then(() => setLoading(false));
  }, []);
  //if (loading) return <LoadingComponent content='Loading activities' />
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
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
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
