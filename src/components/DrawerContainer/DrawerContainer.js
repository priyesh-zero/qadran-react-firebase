import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import QadranAppBar from "../UI/QadranAppBar";
import DrawerContent from "./DrawerContent";

import Dashboard from "../Dashboard/Dashboard";

import { setMenuDrawerOpen } from "../../store/actions/appActions";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("lg")]: {
            width: props => props.chatWidth,
            flexShrink: 0
        },
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        })
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: props => props.chatWidth,
        transition:
            theme.transitions.create("width", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter
            }) + " !important"
    },
    content: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "100vw",
        marginLeft: 0,
        [theme.breakpoints.up("lg")]: {
            width: props => "calc(100% - " + props.chatWidth + "px)"
        }
    }
}));

function DrawerContainer() {
    const dispatch = useDispatch();
    const drawerOpen = useSelector(state => state.app.menuDrawerOpen);
    const chatOpen = useSelector(state => state.app.chatDrawerOpen);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const chatWidth = chatOpen ? (fullScreen ? "100%" : 400) : 240;
    const classes = useStyles({ chatWidth });

    const handleClose = () => {
        dispatch(setMenuDrawerOpen(false));
    };

    return (
        <div className={classes.root}>
            <QadranAppBar isFull={true} />

            <nav className={classes.drawer}>
                <Hidden lgUp implementation="js">
                    <Drawer
                        variant="temporary"
                        anchor={"left"}
                        open={drawerOpen}
                        onClose={handleClose}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        <DrawerContent />
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="js">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        <DrawerContent />
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default React.memo(DrawerContainer);
