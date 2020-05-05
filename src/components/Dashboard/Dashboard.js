import React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";

import Lawyers from "../Lawyers/Lawyers";

const useStyles = makeStyles((theme) => ({
    subView: {
        display: "flex",
        flexGrow: 1,
    },
}));

function Dashboard() {
    const classes = useStyles();

    let match = useRouteMatch({
        path: "/dashboard",
    });

    return (
        <div className={classes.subView}>
            <Switch>
                <Route path={match.url + "/lawyers"}>
                    <Lawyers />
                </Route>
                <Redirect to={match.url + "/lawyers"} />
            </Switch>
        </div>
    );
}

export default Dashboard;
