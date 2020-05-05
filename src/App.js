import React, { useEffect } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Auth from "./components/Auth/Auth";

import { makeStyles } from "@material-ui/core/styles";

import defaultTheme from "./themes/default";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { setTheme, setLang } from "./store/actions/appActions";

import CircularProgress from "@material-ui/core/CircularProgress";
import DrawerContainer from "./components/DrawerContainer/DrawerContainer";

import ContactsIcon from "@material-ui/icons/Contacts";

import Grid from "@material-ui/core/Grid";

import { setDrawerItems } from "./store/actions/appActions";

import languages from "./languages";

var { get } = require("lodash");

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        "& img": {
            "-webkit-user-drag": "none",
            userSelect: "none",
        },
        "& .disabled": {
            opacity: 1,
        },
    },
    progress: {
        color: theme.palette.type === "light" ? "inherit" : "white",
    },
}));

function App() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.firebase.auth);
    const profile = useSelector((state) => state.firebase.profile);
    const themeType = useSelector((state) => state.app.themeType);
    const currentLang = useSelector((state) => state.app.lang);

    const lang = languages[currentLang];

    let drawerItems = {
        dashboard: [
            {
                title: get(lang, "LAWYERS"),
                icon: <ContactsIcon />,
                link: "lawyers",
                color: "#FBB965",
            },
        ],
    };

    useEffect(() => {
        dispatch(setDrawerItems(drawerItems));
    }, []);

    return (
        <ThemeProvider theme={defaultTheme(themeType)}>
            <CssBaseline />
            <Container maxWidth={false} className={classes.root}>
                {auth.isLoaded & profile.isLoaded ? (
                    auth.uid && profile.type ? (
                        <Switch>
                            <Route path={["/dashboard"]}>
                                <DrawerContainer />
                            </Route>
                            <Redirect to="/dashboard" />
                        </Switch>
                    ) : (
                        <ThemeProvider theme={defaultTheme("light")}>
                            <Auth />
                        </ThemeProvider>
                    )
                ) : (
                    <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
                        <Grid item>
                            <CircularProgress className={classes.progress} />
                        </Grid>
                    </Grid>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default App;
