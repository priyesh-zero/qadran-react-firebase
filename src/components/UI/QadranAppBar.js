import React, { Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, Link as RouterLink, useRouteMatch } from "react-router-dom";
import clsx from "clsx";
import { SvgLoader, SvgProxy } from "react-svgmt";

import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import Typography from "@material-ui/core/Typography";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { setMenuDrawerOpen } from "../../store/actions/appActions";

import languages from "../../languages";

var { get } = require("lodash");

const useStyles = makeStyles((theme) => ({
    appBar: {
        boxShadow: "none",
        transition: theme.transitions.create("all", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter,
        }),
        background: (props) => props.color,
    },
    appBarFixDrawer: {
        marginLeft: (props) => props.width,
        [theme.breakpoints.up("lg")]: {
            width: (props) => `calc(100% - ${props.width})`,
        },
    },
    getStarted: {
        borderRadius: "20px",
        marginLeft: theme.spacing(2),
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: "0.4rem 1.4rem",
    },
    brandingContainer: {
        flexGrow: 1,
    },
    branding: {
        cursor: "pointer",
        width: 145,
        height: 50,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
    },
    title: {
        color: "white",
        textAlign: "left",
        fontSize: "2rem",
        fontWeight: "700",
        flexGrow: 1,
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.25rem",
        },
    },
    profileTooltip: {
        margin: 0,
        textAlign: "center",
    },
    langSpan: {
        marginRight: 5,
    },
    avatar: {
        width: 34,
        height: 34,
    },
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const QadranAppBar = ({ isFull }) => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const width = "240px";

    let drawerItems = useSelector((state) => state.app.drawerItems);
    const auth = useSelector((state) => state.firebase.auth);
    const currentLang = useSelector((state) => state.app.lang);
    const lang = languages[currentLang];

    let dashboardMatch = useRouteMatch({
        path: "/dashboard",
    });

    let match = dashboardMatch;

    drawerItems = drawerItems.dashboard;

    let title,
        color = "#1B2A50";

    let openView = drawerItems.find(
        (item) =>
            match.url + "/" + item.link === location.pathname ||
            (item.sub && item.sub.find((subItem) => match.url + "/" + item.link + "/" + subItem.link === location.pathname))
    );
    color = openView ? openView.color : "#1B2A50";
    title = openView ? openView.title : "";
    console.log(title);

    const classes = useStyles({ width, color });

    return (
        <Fragment>
            <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarFixDrawer]: isFull })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={() => dispatch(setMenuDrawerOpen(true))}
                        className={classes.menuButton}
                    >
                        <Tooltip title={get(lang, "MENU")}>
                            <div style={{ height: "24px" }}>
                                <MenuIcon />
                            </div>
                        </Tooltip>
                    </IconButton>
                    <Breadcrumbs separator="›" aria-label="Breadcrumb" className={classes.title}>
                        <Typography variant="h6" color="inherit" noWrap>
                            {title}
                        </Typography>
                    </Breadcrumbs>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
};

export default React.memo(QadranAppBar);
