import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticate() && isAuthenticate().user.role === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
