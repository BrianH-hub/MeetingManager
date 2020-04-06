import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IMeeting } from '../models/meeting';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class MeetingStore {
  @observable meetingRegistry = new Map();
  @observable meeting: IMeeting | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get meetingsByDate() {
    return this.groupMeetingsByDate(Array.from(this.meetingRegistry.values()))
  }

  groupMeetingsByDate(meetings: IMeeting[]) {
    const sortedMeetings = meetings.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    )
    return Object.entries(sortedMeetings.reduce((meetings, meeting) => {
      const date = meeting.date.split('T')[0];
      meetings[date] = meetings[date] ? [...meetings[date], meeting] : [meeting];
      return meetings;
    }, {} as {[key: string]: IMeeting[]}));
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

  @action loadMeeting = async (id: string) => {
    let meeting = this.getMeeting(id);
    if (meeting) {
      this.meeting = meeting;
    } else {
      this.loadingInitial = true;
      try {
        meeting = await agent.Meetings.details(id);
        runInAction('getting meeting',()=>{
          this.meeting = meeting;
          this.loadingInitial = false;
        })
      } catch (error) {
          runInAction('get meeting error', () => {
            this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearMeeting = () => {
    this.meeting = null;
  }

  getMeeting = (id: string) => {
    return this.meetingRegistry.get(id);
  }

  @action createMeeting = async (meeting: IMeeting) => {
    this.submitting = true;
    try {
      await agent.Meetings.create(meeting);
      runInAction('create meeting', () => {
        this.meetingRegistry.set(meeting.id, meeting);
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
        this.meeting = meeting;
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

}

export default createContext(new MeetingStore());
