import React from "react";
import { IProfile } from "../../app/models/profile";
import { combineValidators, isRequired } from "revalidate";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { Form, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface IProps {
    updateProfile: (profile: Partial<IProfile>) => void;
    profile: IProfile;
}

const validate = combineValidators({
    displayName: isRequired("displayName")
});

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
    return (
        <FinalForm
            onSubmit={updateProfile}
            validate={validate}
            initialValues={profile!}
            render={({handleSubmit,invalid,pristine,submitting}) => (
                <Form onSubmit={handleSubmit} error>
                    <Field
                        name="displayName"
                        component={TextAreaInput}
                        rows={3}
                        placeholder="Display Name"
                        value={profile!.displayName}
                    />
                    <Field
                        name="bio"
                        component={TextAreaInput}
                        rows={3}
                        placeholder="Bio"
                        value={profile.bio}
                    />
                    <Button
                        loading={submitting}
                        floated='right'
                        disabled={invalid || pristine}
                        positive
                        content='Update Profile'
                    />
                </Form>
            )}
        />
    );
};

export default observer(ProfileEditForm);
