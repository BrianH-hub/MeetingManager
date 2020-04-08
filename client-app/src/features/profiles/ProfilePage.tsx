import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

interface RouteParams {
    username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
    const rootStore = useContext(RootStoreContext);

    const {
        loadingProfile,
        profile,
        loadProfile,
        follow,
        unfollow,
        isCurrentUser,
        loading,
        setActiveTab
    } = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.username);
    }, [loadProfile, match]);

    if (loadingProfile)
        return <LoadingComponent content="Profile loading..." />;

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader
                    profile={profile!}
                    loading={loading}
                    follow={follow}
                    unfollow={unfollow}
                    isCurrentUser={isCurrentUser}
                />
                <ProfileContent setActiveTab={setActiveTab} />
            </Grid.Column>
        </Grid>
    );
};

export default observer(ProfilePage);