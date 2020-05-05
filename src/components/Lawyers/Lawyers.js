import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { makeStyles } from "@material-ui/styles";

import Section from "../UI/Section";

import languages from "../../languages";

const { isUndefined } = require("lodash");

const useStyles = makeStyles((theme) => ({}));

function Calendar() {
    const classes = useStyles();
    const auth = useSelector((state) => state.firebase.auth);
    const profile = useSelector((state) => state.firebase.profile);
    const currentLang = useSelector((state) => state.app.lang);
    const lang = languages[currentLang];

    const lawyersQuery = useMemo(
        () => ({
            collection: "Users",
            where: ["type", "==", "lawyer"],
            storeAs: "Lawyers",
        }),
        []
    );

    const sectorsQuery = useMemo(
        () => ({
            collection: "Matters",
            storeAs: "Sectors",
        }),
        []
    );

    useFirestoreConnect(lawyersQuery);
    useFirestoreConnect(sectorsQuery);

    const lawyersList = useSelector((state) => state.firestore.ordered.Lawyers);
    const sectorsList = useSelector((state) => state.firestore.ordered.Sectors);
    let loading = false;
    if (isUndefined(lawyersList) || isUndefined(sectorsList)) {
        loading = true;
    }

    console.log(lawyersList, sectorsList, loading);

    return <Section>Lawyers view</Section>;
}

export default Calendar;
