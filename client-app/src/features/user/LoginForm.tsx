import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import { combineValidators, isRequired } from 'revalidate';

import { FORM_ERROR } from 'final-form';
//under construction
import ErrorMessage from '../../app/common/form/ErrorMessage';
import TextInput from '../../app/common/form/TextInput';


const validate = combineValidators({
  email: isRequired('InputEmail'),
  pass: isRequired('Password')
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        postSubmit,
        logError,
        invalidError,
        cleanSubmit,
        dirtySubmit
      }) => (
          
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Login to Reactivities'
            color='teal'
            textAlign='center'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          {logError && !dirtySubmit && (
            <ErrorMessage
              error={logError}
              text='Invalid email or password'
            />
          )}
          <Button
            disabled={(invalidError && !dirtySubmit) || cleanSubmit}
            loading={postSubmit}
            color='teal'
            content='Login'
            fluid
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;

