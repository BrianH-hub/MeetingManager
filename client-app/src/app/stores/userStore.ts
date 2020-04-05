import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";


export default class UserStore {
    rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @computed get isLoggedIn() {
    return !!this.user;
  }
  @observable user: IUser | null = null;
  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });


    } catch (error) {
      throw error;

    }
  };

 @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);


    } catch (error) {
      throw error;
    }
  }

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {

    this.user = null;

  };
}
