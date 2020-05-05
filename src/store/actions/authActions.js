import firebase from "../../firebase";
import { actionTypes } from "redux-firestore";
const auth = firebase.auth();

export const signOut = () => {
    return (dispatch, getState) => {
        auth.signOut().then(() => {
            dispatch({ type: actionTypes.CLEAR_DATA });
            dispatch({ type: "SIGNOUT_SUCCESS" });
        });
    };
};
