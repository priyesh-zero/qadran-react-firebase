import localForage from "localforage";
var moment = require("moment");

export const setLang = lang => {
    return (dispatch, getState) => {
        moment.locale(lang);
        localForage.setItem("lang", lang).then(() => {
            dispatch({ type: "SET_LANGUAGE", value: lang });
        });
    };
};

export const setTheme = theme => {
    return (dispatch, getState) => {
        let themeType = theme ? theme : getState().app.themeType === "light" ? "dark" : "light";
        localForage.setItem("themeType", themeType).then(() => {
            dispatch({ type: "SET_THEME", value: themeType });
        });
    };
};

export const setNotifCount = value => {
    return { type: "SET_NOTIF_COUNT", value: value };
};

export const setChatOpen = value => {
    return { type: "SET_CHAT_OPEN", value: value };
};

export const setNotifDrawerOpen = value => {
    return { type: "SET_NOTIF_DRAWER_OPEN", value: value };
};

export const setMenuDrawerOpen = value => {
    return { type: "SET_MENU_DRAWER_OPEN", value: value };
};

export const setChatDrawerOpen = value => {
    return { type: "SET_CHAT_DRAWER_OPEN", value: value };
};

export const setDrawerItems = value => {
    return { type: "SET_DRAWER_ITEMS", value: value };
};

export const setLawyerProfileModal = id => {
    return { type: "SET_LAWYER_PROFILE_MODAL", value: id };
};
