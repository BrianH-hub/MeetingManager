import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";

import NavBar from "../../features/nav/NavBar";
import MeetingDashboard from "../../features/meetings/dashboard/MeetingDashboard";
import agent from "../api/agent";
import MeetingDetails from '../../features/meetings/details/MeetingDetails';
import MeetingForm from '../../features/meetings/form/MeetingForm';
import NotFound from './NotFound';
import ModalContainer from '../common/modals/ModalContainer';
import LoginForm from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from "./LoadingComponent";
import { ToastContainer } from "react-toastify";
import HomePage from "../../features/home/HomePage";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { observer } from "mobx-react-lite";


const App = () => {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<IMeeting | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleOpenCreateForm = () => {
    setSelectedMeeting(null);
    setEditMode(true);
  };



const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { getUser } = rootStore.userStore;
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/activities' component={MeetingDashboard} />
                <Route path='/activities/:id' component={MeetingDetails} />
                <Route
                  key={location.key}
                  path={['/createActivity', '/manage/:id']}
                  component={MeetingForm}
                />
                <Route path='/login' component={LoginForm} />
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
