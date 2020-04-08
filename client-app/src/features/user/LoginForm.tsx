import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
    email: isRequired("Email"),
    password: isRequired("Password")
});

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) =>
                login(values).catch(error => ({ [FORM_ERROR]: error }))
            }
            validate={validate}
            render={({
                handleSubmit,
                submitting,
                submitError,
                invalid,
                pristine,
                dirtySinceLastSubmit,
            }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header
                        as="h2"
                        content="Login to MeetingManager"
                        color="blue"
                        textAlign="center"
                    />
                    <Field
                        name="email"
                        component={TextInput}
                        placeholder="Email"
                    />
                    <Field
                        name="password"
                        type="password"
                        component={TextInput}
                        placeholder="Password"
                    />
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage
                            error={submitError}
                            text="Invalid Email or Password"
                        />
                    )}
                    <Button
                        disabled={
                            (invalid && !dirtySinceLastSubmit) || pristine
                        }
                        loading={submitting}
                        color="blue"
                        content="Login"
                        fluid
                    />
                </Form>
            )}
        />
    );
};

export default LoginForm;
