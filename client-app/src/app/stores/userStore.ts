import { action, observable, computed, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";
//not yet created
import { history } from "../..";
import agent from "../api/agent";

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
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      //named activities in database?
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      //named activities in database?
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

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
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
