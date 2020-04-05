import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IMeeting } from '../models/meeting';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class MeetingStore {
  @observable meetingRegistry = new Map();
  @observable meetings: IMeeting[] = [];
  @observable selectedMeeting: IMeeting | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get meetingsByDate() {
    return Array.from(this.meetingRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadMeetings = async () => {
    this.loadingInitial = true;
    try {
      const meetings = await agent.Meetings.list();
      runInAction('loading meetings', () => {
        meetings.forEach(meeting => {
          meeting.date = meeting.date.split('.')[0];
          this.meetingRegistry.set(meeting.id, meeting);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load meetings error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action createMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Meetings.create(meeting);
      runInAction('create meeting', () => {
        this.meetingRegistry.set(meeting.id, meeting);
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create meeting error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Meetings.update(meeting);
      runInAction('editing meeting', () => {
        this.meetingRegistry.set(meeting.id, meeting);
        this.selectedMeeting = meeting;
        this.editMode = false;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit meeting error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteMeeting = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Meetings.delete(id);
      runInAction('deleting meeting', () => {
        this.meetingRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete meeting error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedMeeting = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedMeeting = this.meetingRegistry.get(id);
    this.editMode = true;
  }

  @action cancelSelectedMeeting = () => {
    this.selectedMeeting = undefined;
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }

  @action selectMeeting = (id: string) => {
    this.selectedMeeting = this.meetingRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new MeetingStore());
