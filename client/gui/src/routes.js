import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './containers/Home'
import Signup from './containers/Signup';
import Login from './containers/Login';
import EditProfile from './containers/EditProfile';
import UpdateProfile from './containers/UpdateProfile';
import VerifyEmail from './containers/VerifyEmail';
import EventInscriptionForm from './components/EventInscriptionForm';

import requiredAuth from './utils/requiredAuth'
import ProfilePage from './containers/ProfilePage';
import PersonalPage from './containers/PersonalPage'
import MedicalPage from './containers/MedicalPage'
import InstitutionalPage from './containers/InstitutionalPage'
import ContactPage from './containers/ContactPage'
import ListRequestPage from './containers/ListRequestPage';
import EventPage from './containers/EventPage';
import EventRequestsPage from './containers/EventRequestsPage';
import EventForm from './components/EventForm';
import AdminPage from './containers/AdminPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={requiredAuth(Home)}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/verify" component={VerifyEmail}/>
      <Route exact path="/profile" component={requiredAuth(ProfilePage)}/>
      <Route exact path="/profile/personal" component={requiredAuth(PersonalPage)}/>
      <Route exact path="/profile/medical" component={requiredAuth(MedicalPage)}/>
      <Route exact path="/profile/institutional" component={requiredAuth(InstitutionalPage)}/>
      <Route exact path="/profile/contact" component={requiredAuth(ContactPage)}/>
      {/* <Route exact path="/profile/edit" component={requiredAuth(UpdateProfilePage)}/> */}
      <Route exact path="/event/:id" component={requiredAuth(EventPage)}/>
      <Route exact path="/inscription/:id" component={requiredAuth(EventInscriptionForm)}/>
      
      <Route exact path="/requests" component={requiredAuth(ListRequestPage)}/>
      {/* <Route exact path="/solicitudes/:id" component={requiredAuth(RequestPage)}/> */}
      
      {/* ADMIN */}
      <Route exact path="/admin" component={requiredAuth(AdminPage)}/>
      <Route exact path="/admin/request/:id" component={requiredAuth(EventRequestsPage)}/>
      <Route exact path="/admin/create/event" component={EventForm}/>
    </Switch>
  )
}

export default Routes;