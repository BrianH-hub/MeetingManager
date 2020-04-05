import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IMeeting } from '../models/meeting';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import UserStore from './userStore';

configure({enforceActions: 'always'});

export default class MeetingStore {
  rootStore: RootStore;
 constructor(rootStore: RootStore) {
   this.rootStore = rootStore;
 }


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
      (a, b) => a.date.getTime() - b.date.getTime()
    )
    return Object.entries(sortedMeetings.reduce((meetings, meeting) => {
      const date = meeting.date.toISOString().split('T')[0];
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
          meeting.date = new Date(meeting.date);
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
      return meeting;
    } else {
      this.loadingInitial = true;
      try {
        meeting = await agent.Meetings.details(id);
        runInAction('getting meeting',()=>{
          meeting.date = new Date(meeting.date);
          this.meeting = meeting;
          this.meetingRegistry.set(meeting.id, meeting);
          this.loadingInitial = false;
        })
        return meeting;
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
      history.push(`/activities/${meeting.id}`)
    } catch (error) {
      runInAction('create meeting error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
      console.log(error.response);
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
      history.push(`/activities/${meeting.id}`)
    } catch (error) {
      runInAction('edit meeting error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
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

// export default createContext(new MeetingStore());
