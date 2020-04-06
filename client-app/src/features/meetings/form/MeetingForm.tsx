import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IMeeting } from "../../../app/models/meeting";
import { v4 as uuid } from "uuid";
import { ActivityFormValues } from "../../../app/models/activity";
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

interface IProps {
  setEditMode: (editMode: boolean) => void;
  meeting: IMeeting;
  createMeeting: (meeting: IMeeting) => void;
  editMeeting: (meeting: IMeeting) => void;
}

const MeetingForm: React.FC<IProps> = ({
  setEditMode,
  meeting: initialFormState,
  editMeeting,
  createMeeting,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [meeting, setMeeting] = useState<IMeeting>(initializeForm);

  const handleSubmit = () => {
    if (meeting.id.length === 0) {
      let newMeeting = {
        ...meeting,
        id: uuid(),
      };
      createMeeting(newMeeting);
    } else {
      editMeeting(meeting);
    }
  };

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
                  name="title"
                  placeholder="Title"
                  value={meeting.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={meeting.description}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name="category"
                  placeholder="Category"
                  value={meeting.category}
                />
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={meeting.date}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={meeting.time}
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={meeting.city}
                />
                <Field
                  component={TextInput}
                  name="venue"
                  placeholder="Venue"
                  value={meeting.venue}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    meeting.id
                      ? () => history.push(`/activities/${meeting.id}`)
                      : () => history.push("/activities")
                  }
                  disabled={loading}
                  floated="right"
                  type="button"
                  content="Cancel"
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
