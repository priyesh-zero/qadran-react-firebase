const initState = {
    lang: "en",
    themeType: "light",
    notifDrawerOpen: false,
    menuDrawerOpen: false,
    chatDrawerOpen: false,
    lawyerProfileModal: null,
    notifCount: 0,
    chatOpen: null,
    drawerItems: {
        case: [],
        dashboard: []
    }
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_LANGUAGE":
            console.log("set lang to: ", action.value);
            return {
                ...state,
                lang: action.value
            };
        case "SET_THEME":
            console.log("set theme type to: ", action.value);
            return {
                ...state,
                themeType: action.value
            };
        case "SET_NOTIF_COUNT":
            console.log("set notif count to: ", action.value);
            return {
                ...state,
                notifCount: action.value
            };
        case "SET_CHAT_OPEN":
            console.log("set chat open to: ", action.value);
            return {
                ...state,
                chatOpen: action.value
            };
        case "SET_NOTIF_DRAWER_OPEN":
            console.log("set notif drawer open to: ", action.value);
            return {
                ...state,
                notifDrawerOpen: action.value
            };
        case "SET_MENU_DRAWER_OPEN":
            console.log("set menu drawer open to: ", action.value);
            return {
                ...state,
                menuDrawerOpen: action.value
            };
        case "SET_CHAT_DRAWER_OPEN":
            console.log("set chat drawer open to: ", action.value);
            return {
                ...state,
                chatDrawerOpen: action.value
            };
        case "SET_LAWYER_PROFILE_MODAL":
            console.log("set lawyer profile modal: ", action.value);
            return {
                ...state,
                lawyerProfileModal: action.value
            };
        case "SET_DRAWER_ITEMS":
            //console.log("set drawer items", action.value);
            return {
                ...state,
                drawerItems: action.value
            };
        default:
            return state;
    }
};

export default appReducer;
