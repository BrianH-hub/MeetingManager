import MeetingStore from './meetingStore';
import UserStore from './userStore';
import { createContext } from 'react';





export class RootStore {
    meetingStore: MeetingStore;
    userStore: UserStore;


    constructor() {
        this.meetingStore = new MeetingStore(this);
        this.userStore = new UserStore(this);

    }
}

export const RootStoreContext = createContext(new RootStore());