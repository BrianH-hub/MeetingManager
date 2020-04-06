import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IMeeting } from "../../../app/models/meeting";
import { v4 as uuid } from "uuid";
import { MeetingyFormValues } from "../../../app/models/meeting";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import { RouteComponentProps } from "react-router";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import { category } from "../../../app/common/options/categoryOptions";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
});


interface DetailParams {
  id: string;
}

const MeetingForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const meetingStore = useContext(MeetingStore);
  const {
    createMeeting,
    editMeeting,
    submitting,
    loadMeeting
  } = meetingStore;

  const [meeting, setMeeting] = useState(new MeetingFormValues());
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadMeeting(match.params.id)
        .then(meeting => {
          setMeeting(new MeetingFormValues(meeting));
        })
        .finally(() => setLoading(false));
    }
  }, [loadMeeting, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...meeting } = values;
    meeting.date = dateAndTime;
    if (!meeting.id) {
      let newMeeting = {
        ...meeting,
        id: uuid(),
      };
      createMeeting(newMeeting);
    } else {
      editMeeting(meeting);
    }
  };

<<<<<<< HEAD
=======
  // const handleInputChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setMeeting({ ...meeting, [name]: value });
  // };
  //outdated

  cont handleFinalFormSubmit = (values: any) => {
    const { date, time, ...meeting } = values;
    const dateAndTime = combineDateAndTime(values.date, values.time);
    meeting.date = dateAndTime;
    if (!meeting.id) {
      let newActivity = {
        ...meeting,
        id: uuid()
      };
  }

>>>>>>> updating handleFinalForm
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={meeting}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={meeting.title}
                  component={TextInput}
                />
                <Field
                  name='description'
                  placeholder='Description'
                  rows={3}
                  value={meeting.description}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name='category'
                  placeholder='Category'
                  value={meeting.category}
                />
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={meeting.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder='Time'
                    value={meeting.time}
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name='city'
                  placeholder='City'
                  value={meeting.city}
                />
                <Field
                  component={TextInput}
                  name='venue'
                  placeholder='Venue'
                  value={meeting.venue}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  onClick={
                    meeting.id
                      ? () => history.push(`/activities/${meeting.id}`)
                      : () => history.push('/activities')
                  }
                  disabled={loading}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MeetingForm);
