import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import appReducer from "./appReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});
