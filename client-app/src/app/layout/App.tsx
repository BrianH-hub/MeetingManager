import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import MeetingDashboard from "../../features/meetings/dashboard/MeetingDashboard";
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import MeetingForm from "../../features/meetings/form/MeetingForm";
import MeetingDetails from "../../features/meetings/details/MeetingDetails";
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/meetings' component={MeetingDashboard} />
              <Route path='/meetings/:id' component={MeetingDetails} />
              <Route
                key={location.key}
                path={['/createMeeting', '/manage/:id']}
                component={MeetingForm}
              />
            <Route component={NotFound} />
            </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
