import RootStore from "./rootStore";
import { observable, action, runInAction, computed, reaction } from "mobx";
import { IProfile, IPhoto, IUserActivity } from "../models/profile";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ProfileStroe {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.activeTab,
            newIndex => {
                if (newIndex === 3 || newIndex === 4) {
                    const predicate =
                        newIndex === 3 ? "followers" : "following";
                    this.loadingFollowings(predicate);
                } else {
                    this.followings = [];
                }
            }
        );
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile: boolean = true;
    @observable uploadingPhoto: boolean = false;
    @observable loading: boolean = false;
    @observable followings: IProfile[] = [];
    @observable activeTab: number = 0;

    @observable userActivities: IUserActivity[] = [];
    @observable loadingActivities: boolean = false;

    @computed get isCurrentUser() {
        if (this.rootStore.userStore.user && this.profile) {
            return (
                this.rootStore.userStore.user.username === this.profile.username
            );
        } else {
            return false;
        }
    }

    @action loadUserActivities = async (
        username: string,
        predicate?: string
    ) => {
        this.loadingActivities = true;
        try {
            const activities = await agent.Profiles.listActivities(
                username,
                predicate!
            );
            runInAction(() => {
                this.userActivities = activities;
                this.loadingActivities = false;
            });
        } catch (error) {
            toast.error("Problem loading the activities");
            runInAction(() => {
                this.loadingActivities = false;
            });
        }
    };

    @action loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loadingProfile = false;
            });
            console.log(error);
        }
    };

    @action uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const photo = await agent.Profiles.uploadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos.push(photo);
                    if (photo.isMain && this.rootStore.userStore.user) {
                        this.profile.image = photo.url;
                        this.rootStore.userStore.user.image = photo.url;
                    }
                }
                this.uploadingPhoto = false;
            });
        } catch (error) {
            runInAction(() => {
                this.uploadingPhoto = false;
            });
        }
    };

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            runInAction(() => {
                this.rootStore.userStore.user!.image = photo.url;
                this.profile!.photos.find(a => a.isMain)!.isMain = false;
                this.profile!.photos.find(
                    a => a.id === photo.id
                )!.isMain = true;
                this.profile!.image = photo.url;
                this.loading = false;
            });
        } catch (error) {
            toast.error("Problem Setting Main Photo");
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    @action deletePhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                this.profile!.photos = this.profile!.photos.filter(
                    a => a.id !== photo.id
                );
                this.loading = false;
            });
        } catch (error) {
            toast.error("Error Deleting Photo");
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    @action updateProfile = async (profile: Partial<IProfile>) => {
        this.loading = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (
                    profile.displayName !==
                    this.rootStore.userStore.user!.displayName
                ) {
                    this.rootStore.userStore.user!.displayName = profile.displayName!;
                }
                this.profile = { ...this.profile!, ...profile };
            });
        } catch (error) {
            toast.error("Problem Updating Profile");
        }
    };

    @action follow = async (username: string) => {
        this.loading = true;
        try {
            await agent.Profiles.follow(username);
            runInAction(() => {
                this.profile!.following = true;
                this.profile!.followersCount++;
                this.loading = false;
            });
        } catch (error) {
            toast.error("Problem following the user");
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    @action unfollow = async (username: string) => {
        this.loading = true;
        try {
            await agent.Profiles.unfollow(username);
            runInAction(() => {
                this.profile!.following = false;
                this.profile!.followersCount--;
                this.loading = false;
            });
        } catch (error) {
            toast.error("Problem unfollowing the user");
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    @action loadingFollowings = async (predicate: string) => {
        this.loading = true;
        try {
            const followings = await agent.Profiles.listFollowing(
                this.profile!.username,
                predicate
            );
            runInAction(() => {
                this.followings = followings;
                this.loading = false;
            });
        } catch (error) {
            toast.error("error loading followings");
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    @action setActiveTab = (activeIndexNumber: number) => {
        this.activeTab = activeIndexNumber;
    };
}
