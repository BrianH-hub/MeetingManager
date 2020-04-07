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
    username: isRequired('Username'),
  displayName: isRequired('DisplayName'),
  email: isRequired('InputEmail'),
  pass: isRequired('Password')
});

const RegisterForm = () => {
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
      //reverted back for group synchronization
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
          
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Sign Up For Meeting Manager'
            color='blue'
            textAlign='center'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text='Invalid email or password'
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='blue'
            content='Login'
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
