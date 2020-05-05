import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { Box, Card, Typography, Grid, useMediaQuery } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Signin from "./Signin";

import languages from "../../languages";

var { get } = require("lodash");

const useStyles = makeStyles((theme) => ({
    root: {
        color: "white",
        padding: theme.spacing(1),
        background: "linear-gradient(to right, " + darken(theme.palette.primary.main, 0.6) + " 0%, " + theme.palette.primary.main + " 100%)",
        backgroundColor: theme.palette.primary.dark,
        minHeight: "100%",
        [theme.breakpoints.up("md")]: {
            height: "100%",
            padding: 0,
        },
    },
    welcomePanel: {
        width: "100%",
        textAlign: "center",
        padding: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            textAlign: "left",
            padding: theme.spacing(16),
            marginTop: theme.spacing(2),
        },
    },
    welcomeLogo: {
        height: 140,
        width: 140,
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            height: 100,
            width: 100,
            marginBottom: theme.spacing(1),
        },
    },
    welcomeTextContainer: {
        maxWidth: 600,
        [theme.breakpoints.down("sm")]: {
            margin: "auto",
        },
    },
    loginPanelContainer: {
        [theme.breakpoints.up("md")]: {
            height: "100%",
        },
    },
    loginPanel: {
        maxWidth: 500,
        margin: " 24px auto 0",
        [theme.breakpoints.up("md")]: {
            height: "100%",
            width: "100%",
            float: "right",
            maxWidth: 400,
            margin: 0,
        },
    },
    card: {
        overflow: "scroll",
        backgroundColor: "white",
        height: "100%",
    },
    cardCntent: {
        padding: theme.spacing(4, 4, 4, 4),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4, 2, 4, 2),
        },
    },
}));

const Auth = () => {
    const classes = useStyles();

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));

    const currentLang = useSelector((state) => state.app.lang);
    const lang = languages[currentLang];

    return (
        <Grid container alignItems="stretch" direction={!mobile ? "row" : "column"} className={classes.root}>
            <Grid item md={8}>
                <div className={classes.welcomePanel}>
                    <div className={classes.welcomeTextContainer}>
                        <Typography variant={mobile ? "h5" : "h3"} className="font-light">
                            {get(lang, "WELCOME_TITLE", "")}
                        </Typography>
                        {!mobile ? (
                            <Box mt={3} mb={2}>
                                <Typography variant="subtitle1" color="inherit">
                                    {get(lang, "WELCOME_DESCRIPTION", "")}
                                </Typography>
                            </Box>
                        ) : null}
                    </div>
                </div>
            </Grid>

            <Grid item md={4} className={classes.loginPanelContainer}>
                <div className={classes.loginPanel}>
                    <Card square={mobile ? false : true} className={classes.card}>
                        <Switch>
                            <Route exact path="/signin">
                                <Signin />
                            </Route>
                            <Redirect to="/signin" />
                        </Switch>
                    </Card>
                </div>
            </Grid>
        </Grid>
    );
};

export default Auth;
