import React from "react";
import { Tab, Grid, GridColumn, Header, Button } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import ProfileEditForm from "./ProfileEditForm";

const ProfileDescription = () => {
    const rootStore = useContext(RootStoreContext);
    const { updateProfile, isCurrentUser, profile } = rootStore.profileStore;
    const [editMode, setEditMode] = useState(false);
    return (
        <Tab.Pane>
            <Grid>
                <GridColumn width={16}>
                    <Header
                        floated="left"
                        icon="user"
                        content={`About ${profile!.displayName}`}
                    />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={editMode ? "Cancel" : "Edit Profile"}
                            onClick={() => {
                                setEditMode(!editMode);
                            }}
                        />
                    )}
                </GridColumn>
                <GridColumn width={16}>
                    {editMode ? (
                        <ProfileEditForm
                            updateProfile={updateProfile}
                            profile={profile!}
                        />
                    ) : (
                        <span>{profile!.bio}</span>
                    )}
                </GridColumn>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfileDescription);
