import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IMeeting } from "../models/meeting";
import NavBar from "../../features/nav/NavBar";
import MeetingDashboard from "../../features/meetings/dashboard/MeetingDashboard";
import agent from "../api/agent";

const App = () => {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<IMeeting | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedMeeting(null);
    setEditMode(true);
  };

  const handleCreateMeeting = (meeting: IMeeting) => {
    agent.Meetings.create(meeting).then(() => {
      setMeetings([...meetings, meeting]);
      setSelectedMeeting(meeting);
      setEditMode(false);
    });
  };

  const handleEditMeeting = (meeting: IMeeting) => {
    agent.Meetings.update(meeting).then(() => {
      setMeetings([...meetings.filter((a) => a.id !== meeting.id), meeting]);
      setSelectedMeeting(meeting);
      setEditMode(false);
    });
  };

  const handleDeleteMeeting = (id: string) => {
    agent.Meetings.delete(id).then(() => {
      setMeetings([...meetings.filter((a) => a.id !== id)]);
    });
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
    });
  }, []);

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
        />
      </Container>
    </Fragment>
  );
};

export default App;
