import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";

import "typeface-lato";

import { rootReducer } from "./store/reducers/rootReducer";
import firebase from "./firebase";
import App from "./App";

/* Redux Store */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

/* Firebase Props */
const rrfProps = {
    firebase,
    config: {
        userProfile: "Users",
        useFirestoreForProfile: true
    },
    dispatch: store.dispatch,
    createFirestoreInstance
};

/* React DOM */
const render = Component => {
    return ReactDOM.render(
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Component />
                    </MuiPickersUtilsProvider>
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>,
        document.getElementById("root")
    );
};
render(App);

/* Hot Module Replacement */
if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./App", () => {
        const NextApp = require("./App").default;
        render(NextApp);
    });
    module.hot.accept("./store/reducers/rootReducer", () => {
        const nextRootReducer = require("./store/reducers/rootReducer").rootReducer;
        store.replaceReducer(nextRootReducer);
    });
}
