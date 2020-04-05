import {observable, computed, action} from "mobx";
import {IUser} from "../models/user";

export default class UserStore {
    @observable user: IUser | null = null;

    @computed get isLoggedIn() {return !!this.user}

    @action login = async (values: IUserFormValues) => {
        try {
        } catch (error) {
            console.log(error)
        }
        }
    }
