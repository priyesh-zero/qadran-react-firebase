import React, { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import IconButton from "@material-ui/core/IconButton";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Grid from "@material-ui/core/Grid";

import languages from "../../languages";
var { get } = require("lodash");

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    fullHeight: {
        height: "100%",
    },
    tabBar: {
        //boxShadow: theme.shadows[4],
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
    },
    inner: {
        margin: "0",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: theme.spacing(3),
        flex: "1",
        maxWidth: "100vw",
        [theme.breakpoints.down("sm")]: {
            padding: "0rem",
        },
    },
    title: {
        fontWeight: "900",
        textTransform: "uppercase",
        marginLeft: "2rem",
    },
    toolBar: {
        minHeight: "50px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    paper: {
        borderRadius: 10,
        height: "100%",
        margin: "0 auto",
        width: "100%",
        padding: theme.spacing(3),
        overflowX: "scroll",
        overflowY: "hidden",
        position: "relative",
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1),
        },
    },
    indicator: {
        backgroundColor: "white",
    },
    fab: {
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        [theme.breakpoints.down("sm")]: {
            bottom: "1rem",
            right: "1rem",
        },
    },
    progress: {
        position: "absolute",
        color: theme.palette.type === "light" ? theme.palette.primary.main : "white",
        top: "calc(50% - 20px)",
        left: "calc(50% - 20px)",
    },
    tab: {
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
            overflow: "visible",
        },
    },
    padding: {
        padding: theme.spacing(0, 2),
        [theme.breakpoints.down("sm")]: {
            padding: 0,
        },
    },
    badge: {
        color: "white",
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down("sm")]: {
            right: -9,
        },
    },
    emptyRoot: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingBottom: theme.spacing(3),
    },
    emptyContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "50%",
        margin: "auto",
        minWidth: 250,
        maxWidth: 800,
    },
    emptyTitle: {
        color: theme.palette.type === "light" ? theme.palette.primary.main : null,
        fontSize: "3rem",
        fontWeight: 700,
        marginBottom: "0.5rem",
        textAlign: "center",
    },
    emptySubtitle: {
        color: theme.palette.type === "light" ? theme.palette.primary.main : null,
        fontSize: "1.2rem",
        fontWeight: 700,
        textAlign: "center",
    },
    button: {
        marginTop: theme.spacing(3),
    },
    backBtn: {
        zIndex: 1,
        position: "absolute",
        top: theme.spacing(4),
        left: theme.spacing(4),
    },
    dragActive: {
        background: theme.palette.primary.main,
    },
}));

function Section({ children, tabs, openTab, handleTabChange, action, loading, sidebar, empty, fullHeight, handleBack, isDragActive }) {
    const classes = useStyles();

    const currentLang = useSelector((state) => state.app.lang);
    const lang = languages[currentLang];

    return (
        <div className={clsx(classes.root, { [classes.fullHeight]: fullHeight })}>
            <div className={clsx(classes.inner, { [classes.dragActive]: isDragActive })}>
                <Paper className={classes.paper} style={sidebar ? { overflowX: "unset", display: "flex" } : null}>
                    {handleBack ? (
                        <Tooltip title={get(lang, "BACK")}>
                            <IconButton style={{ color: "rgba(0,0,0,0.5)" }} aria-label="Back" onClick={handleBack} className={classes.backBtn}>
                                <div style={{ height: "24px" }}>
                                    <KeyboardBackspace />
                                </div>
                            </IconButton>
                        </Tooltip>
                    ) : null}
                    {loading ? (
                        <CircularProgress className={classes.progress} />
                    ) : empty ? (
                        <div className={classes.emptyRoot}>
                            <div className={classes.emptyContainer}>
                                <div className={classes.emptyTitle}>{empty.title}</div>
                                <div className={classes.emptySubtitle}>{empty.subtitle}</div>
                                {empty.multiple ? (
                                    <Grid container spacing={2} justify="center" className={classes.button}>
                                        {empty.actions &&
                                            empty.actions.map((actionDetails) => (
                                                <Grid item key={actionDetails.title}>
                                                    <Button variant="contained" color="primary" onClick={actionDetails.action}>
                                                        {actionDetails.title}
                                                    </Button>
                                                </Grid>
                                            ))}
                                    </Grid>
                                ) : empty.action ? (
                                    <Button variant="contained" color="primary" onClick={empty.action.action} className={classes.button}>
                                        {empty.action.title}
                                    </Button>
                                ) : null}
                            </div>
                        </div>
                    ) : (
                        children
                    )}
                </Paper>
            </div>
        </div>
    );
}

export default Section;
