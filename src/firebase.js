import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAbCzRpUOrjnwrX6SnMYx6D4hRnFjSl_eo",
    authDomain: "qadran-dev.firebaseapp.com",
    databaseURL: "https://qadran-dev.firebaseio.com",
    projectId: "qadran-dev",
    storageBucket: "qadran-dev.appspot.com",
    messagingSenderId: "482489328786",
    appId: "1:482489328786:web:a5c634c57cc996200cb24b",
    measurementId: "G-CG9VYP5HXE"
};

firebase.initializeApp(config);
firebase
    .firestore()
    .enablePersistence({ synchronizeTabs: true })
    .catch(function(err) {
        if (err.code === "failed-precondition") {
            console.log("multiple tab");
        } else if (err.code === "unimplemented") {
            console.log("browser not supported");
        }
    });

const firestore = firebase.firestore();

export { firestore };
export default firebase;
