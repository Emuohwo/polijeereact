import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from '../utils/helper';
import Header from './partials/Header.jsx';
import Footer from './partials/Footer';
import HomePage from './HomePage';
import Login from './auth/Signin.jsx';
import Signup from './auth/UserSignup.jsx';
import PageNotFound from "./PageNotFound.jsx";
import Offices from "./admin/Offices.jsx";
import { AddOffice } from "./admin/AddOffice.jsx";
import { EditOffice } from "./admin/EditOffice.jsx";
import { OfficesPage } from "./admin/OfficesPage.jsx";
import Parties from "./admin/Parties.jsx";
import AddParty from "./admin/Parties.jsx";
import EditParty from "./admin/EditParty.jsx";
import PartiesPage from "./admin/PartiesPage.jsx";
import AddCandidate from './admin/AddCandidate.jsx';
import EditCandidate from './admin/EditCandidate.jsx';
import { CandidatesPage } from "./admin/CandidatesPage.jsx";
import CandidatesUser from './user/CandidatesUser.jsx';
import CandidateContest from "./user/CandidateContest";
import OfficesPageUser from "./user/OfficesPageUser";
import OfficesUsers from "./user/OfficesUsers";
import PartiesUsers from './user/PartiesUsers.jsx';
import PartiesPageUser from "./user/PartiesPageUser.jsx";

import PrivateRoute from '../route-type/PrivateRoute.jsx';
import PublicRoute from '../route-type/PublicRoute.jsx';

/**
 * App class declaration
 * 
 * class App
 * 
 * @extends {React.Component}
 */
class App extends React.Component {
    /**
     * Renders Login component
     * 
     * @returns {XML} XML/JSX
     */
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header/>
                        <Switch>
                            <Route path='/' component={HomePage} exact={true}/>
                            <PublicRoute exact path='/login' component={Login}/>
                            <PublicRoute exact path='signup' component={Signup}/>

                            <PrivateRoute path='/' component={AddOffice}/>
                            <PrivateRoute path='/' component={EditOffice}/>
                            <PrivateRoute path='/' component={Offices}/>
                            <PrivateRoute path='/' component={OfficesPage}/>
                            
                            <PrivateRoute path='/' component={AddParty}/>
                            <PrivateRoute path='/' component={EditParty}/>
                            <PrivateRoute path='/' component={Parties}/>
                            <PrivateRoute path='/' component={PartiesPage}/>

                            <PrivateRoute path='/' component={AddCandidate}/>
                            <PrivateRoute path='/' component={EditCandidate}/>
                            <PrivateRoute path='/' component={CandidatesPage}/>

                            <PrivateRoute path='/' component={OfficesUsers}/>
                            <PrivateRoute path='/' component={OfficesPageUser}/>
                            
                            <PrivateRoute path='/' component={PartiesUsers}/>
                            <PrivateRoute path='/' component={PartiesPageUser}/>

                            <PrivateRoute path='/' component={CandidateContest}/>
                            <PrivateRoute path='/' component={CandidatesUser}/>

                            <PrivateRoute path='/' component={HomePage}/>
                            <Route path='*' component={PageNotFound}/>

                        </Switch>
                        <Footer/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
