import MeetingStore from "./meetingStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';

export class RootStore {
  commonStore: CommonStore;
  modalStore: ModalStore;
  meetingStore: MeetingStore;
  userStore: UserStore;

  constructor() {
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.meetingStore = new MeetingStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
