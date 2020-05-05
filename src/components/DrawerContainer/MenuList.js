import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import { populate } from "react-redux-firebase";
import { Link as RouterLink, useLocation, useRouteMatch } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import languages from "../../languages";

import { setMenuDrawerOpen } from "../../store/actions/appActions";
import clsx from "clsx";

var { get, isEqual, isEmpty } = require("lodash");

const useStyles = makeStyles((theme) => ({
    link: { textDecoration: "none", color: "inherit" },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    badgeWithSub: {
        marginRight: 15,
    },
    listTopMargin: {
        marginTop: theme.spacing(6),
    },
}));

const MenuList = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const currentLang = useSelector((state) => state.app.lang);
    const lang = languages[currentLang];

    let drawerItems = useSelector((state) => state.app.drawerItems);

    const listItemClick = (filter) => {
        dispatch(setMenuDrawerOpen(false));
    };

    let dashboardMatch = useRouteMatch({
        path: "/dashboard",
    });

    let match = dashboardMatch;

    drawerItems = drawerItems.dashboard;

    return (
        <List
            dense
            component="nav"
            className={clsx({ [classes.listTopMargin]: dashboardMatch })}
            subheader={<ListSubheader component="div">{get(lang, "DASHBOARD")}</ListSubheader>}
        >
            {drawerItems
                ? drawerItems.map((item, index) => {
                      return (
                          <RouterLink key={item.title} to={match.url + "/" + item.link} className={classes.link}>
                              <ListItem
                                  button
                                  selected={match.url + "/" + item.link === location.pathname}
                                  onClick={() => listItemClick(item.notifFilter)}
                              >
                                  {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
                                  <ListItemText primary={item.title} />
                                  {item.notifCount ? <Badge badgeContent={item.notifCount} color="secondary" /> : null}
                              </ListItem>
                          </RouterLink>
                      );
                  })
                : null}
        </List>
    );
};

//MenuList.whyDidYouRender = true;

export default React.memo(MenuList);
