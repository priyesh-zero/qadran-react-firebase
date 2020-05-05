import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { makeStyles } from "@material-ui/styles";

import Section from "../UI/Section";

import languages from "../../languages";

const useStyles = makeStyles((theme) => ({}));

const populates = [{ child: "user", root: "Users" }];

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
            populates,
        }),
        []
    );

    useFirestoreConnect(lawyersQuery);

    const lawyersList = useSelector((state) => state.firestore.ordered.Lawyers);

    return <Section>
        Lawyers list view
    </Section>;
}

export default Calendar;
