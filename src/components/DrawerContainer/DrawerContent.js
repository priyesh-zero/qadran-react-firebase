import React, { Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";

import { Link as RouterLink, useRouteMatch, useLocation } from "react-router-dom";
import { SvgLoader, SvgProxy } from "react-svgmt";

import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import MessageIcon from "@material-ui/icons/Message";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/ArrowBackIos";
import ExitIcon from "@material-ui/icons/ExitToApp";
import CancelIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/PlaylistAddCheck";
import Tooltip from "@material-ui/core/Tooltip";
import FaceIcon from "@material-ui/icons/Face";

import { signOut } from "../../store/actions/authActions";

import languages from "../../languages";
import { firestore } from "../../firebase";
import clsx from "clsx";

import MenuList from "./MenuList";

import Grid from "@material-ui/core/Grid";

var { get, isEqual } = require("lodash");

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    drawerHeader: {
        padding: theme.spacing(2),
    },
    brandingContainer: {
        width: 150,
        height: 50,
    },
    link: { textDecoration: "none", color: "inherit" },
    faceIcon: {
        color: "white",
        width: 50,
        height: 50
    },
    backButton: {
        flexShrink: 0,
        backgroundColor: (props) => props.color,
        paddingTop: theme.spacing(0),
        width: "80%",
        color: "white",
        borderRadius: "0 30px 30px 0",
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1.5),
        minHeight: 62,
        marginBottom: theme.spacing(1),
        boxShadow: theme.shadows[2],
    },
    backList: {
        paddingBottom: 0,
    },
    homeIcon: {
        height: 15,
    },
    homeLabel: {
        fontSize: "0.75rem !important",
    },
    caseTitle: {
        fontWeight: 700,
        fontSize: 16,
        color: "white",
        textAlign: "left",
        paddingLeft: theme.spacing(0.5),
        textTransform: "capitalize",
        display: "-webkit-box",
        "-webkit-line-clamp": 3,
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        wordWrap: "break-word",
    },
    backButtonItem: {
        color: "white",
        opacity: "0.5",
        padding: "0",
        animation: "0.1s",
        "&:hover": {
            opacity: "0.7",
        },
    },

    buttonsBox: {
        minHeight: 72,
        flexGrow: 1,
        width: "100%",
    },
    fab: {
        margin: theme.spacing(1),
    },
    bigAvatar: {
        margin: 10,
        width: 90,
        height: 90,
        position: "absolute",
        left: 64,
        top: "calc(143px + env(safe-area-inset-top))",
        border: "8px solid " + theme.palette.background.default,
        marginTop: theme.spacing(1),
        cursor: "pointer",
        background: "rgba(0,0,0,0.7)",
    },
    profileGrid: {
        flexShrink: 0,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
        backgroundColor: theme.palette.background.default,
    },
    headerText: {
        color: theme.palette.type === "light" ? "#1B2A50" : "white",
    },
    toolbar: theme.mixins.toolbar,
    header: {
        flexShrink: 0,
        padding: theme.spacing(1),
    },
    headerContrast: {
        backgroundColor: theme.palette.background.default,
    },
}));

const DrawerContent = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const location = useLocation();
    let drawerItems = useSelector((state) => state.app.drawerItems);

    const currentLang = useSelector((state) => state.app.lang);
    const lang = languages[currentLang];
    const auth = useSelector((state) => state.firebase.auth);
    const profile = useSelector((state) => state.firebase.profile);

    let dashboardMatch = useRouteMatch({
        path: "/dashboard",
    });

    let match = dashboardMatch;
    drawerItems = drawerItems.dashboard;

    let color = "#1B2A50";
    let openView = drawerItems.find(
        (item) =>
            match.url + "/" + item.link === location.pathname ||
            (item.sub && item.sub.find((subItem) => match.url + "/" + item.link + "/" + subItem.link === location.pathname))
    );
    color = openView ? openView.color : "1B2A50";

    const classes = useStyles({ color });

    return (
        <Fragment>
            <div className={classes.root}>
                <div className={clsx(classes.header, classes.toolbar, { [classes.headerContrast]: dashboardMatch })}>
                    <div className={classes.secureZoneTopHeight}></div>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item className={classes.brandingContainer}>

                        </Grid>
                    </Grid>
                </div>

                <Fragment>
                    <Grid container direction="column" justify="center" alignItems="stretch" className={classes.profileGrid}>
                        <Grid item>
                            <Box fontWeight="fontWeightBold" className={classes.headerText}>
                                <Typography align="center" variant="body1">
                                    {profile.first + " " + profile.last}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box fontWeight="fontWeightLight" mt={0.75} mb={0} className={classes.headerText}>
                                <Typography align="center" variant="body2">
                                    {auth.email}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Avatar src={get(profile, "profilePicture", null)} className={classes.bigAvatar}>
                        {!get(profile, "profilePicture", null) ? <FaceIcon className={classes.faceIcon} /> : null}
                    </Avatar>
                </Fragment>
                <MenuList />
                <Grid container justify="center" alignItems="flex-end" className={classes.buttonsBox}>
                    <Grid item>
                        <Tooltip title={"Sign Out"}>
                            <Fab color="secondary" aria-label="message" className={classes.fab} onClick={() => dispatch(signOut())}>
                                <ExitIcon />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
};

export default React.memo(DrawerContent);
