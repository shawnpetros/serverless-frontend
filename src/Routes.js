import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import NotFound from "./containers/NotFound";
import NewNote from "./containers/NewNote";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute
                path="/signin"
                exact
                component={Login}
                appProps={appProps}
            />
            <AppliedRoute
                path="/signup"
                exact
                component={SignUp}
                appProps={appProps}
            />
            <AppliedRoute
                path="/notes/new"
                exact
                component={NewNote}
                appProps={appProps}
            />
            {/* catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    );
}
