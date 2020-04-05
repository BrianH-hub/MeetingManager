import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';
import { combineValidators, isRequired } from 'revalidate';
// import ErrorMessage from '../../app/common/form/ErrorMessage';
import { FORM_ERROR } from 'final-form';
//import TextINput  - not created yet


const validate = combineValidators({
  email: isRequired('InputEmail'),
  pass: isRequired('Password')
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={values => console.log(values)}
      render={({ handleSubmit }) => (
          
        <Form onSubmit={handleSubmit}>
          <Header
            as='h2'
            content='Login to Reactivities'
            color='blue'
            textAlign='center'
          />
          {/* <Field name='email' component={TextInput} placeholder='InputEmail' /> */}
          <Field
            name='pass'
            // component={TextInput}
            placeholder='Password'
            type='pass'
          />
         
          <Button
            positive content = 'Login'
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
