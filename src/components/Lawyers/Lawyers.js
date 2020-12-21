import React, { useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { makeStyles } from "@material-ui/styles";

import { Grid } from '@material-ui/core'
import InfiniteLoader from 'react-infinite-loader'

import Section from "../UI/Section";

import languages from "../../languages";

// Custom Components
import LawyerView from './LawyerView'
import LawyerFilter from './LawyerFilter'
import { setDrawerItems } from "../../store/actions/appActions";

const { isUndefined } = require("lodash");

const useStyles = makeStyles((theme) => ({}));

let GridRef = null

function Calendar() {
    const classes = useStyles();
    const auth = useSelector((state) => state.firebase.auth);
    const profile = useSelector((state) => state.firebase.profile);
    const currentLang = useSelector((state) => state.app.lang);
    const lang = languages[currentLang];


    const [ limit, setLimit ] = useState(2)

    const [ langFilter, setLangFilter ] = useState('')
    
    const [ sectorFilter, setSectorFilter ] = useState('')

    const lawyersQuery = useMemo(
        () => {
            if (langFilter !== '') {
                return {
                    collection: "Users",
                    where: ["type", "==", "lawyer"],
                    where: ["languages."+langFilter, "==", true],
                    storeAs: "Lawyers",
                    limit: limit
                }
            } else if (sectorFilter !== '') {
                return {
                    collection: "Users",
                    where: ["type", "==", "lawyer"],
                    where: ["sectors."+sectorFilter, "==", true],
                    storeAs: "Lawyers",
                    limit: limit
                }
            } else {
                return {
                    collection: "Users",
                    where: ["type", "==", "lawyer"],
                    storeAs: "Lawyers",
                    limit: limit
                } 
            }
        },
        [limit, langFilter, sectorFilter]
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

    let lawyersList = useSelector((state) => state.firestore.ordered.Lawyers);
    const sectorsList = useSelector((state) => state.firestore.ordered.Sectors);
    
    let loading = false;

    if (isUndefined(lawyersList) || isUndefined(sectorsList)) {
        loading = true;
    }


    const onVisited = () => {
        if (lawyersList && limit == lawyersList.length) {
            setLimit(limit + 1)
        }
    }


    const setFilter = (cb, value) => {
        // setLimit(1)
        setLangFilter('')
        setSectorFilter('')
        cb(value)
    }

    return (
        <Section >
            <h3>Lawyers view {limit} {langFilter}</h3>
            <LawyerFilter
            language={langFilter}
            sector={sectorFilter}
            setLanguage={setLangFilter}
            setSectorFilter={setSectorFilter}
            setFilter={setFilter}
            sectors={sectorsList}
            lang={currentLang}
            />
            <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
            ref={ref => {
                if (ref) {
                    if (ref.offsetParent.offHeight - ref.offHeight > 300) {
                        setLimit(2)
                    }
                }
            }}
            >
                { lawyersList && sectorsList ?
                    lawyersList.map(lawyer => 
                    <LawyerView 
                    key={lawyer.id} 
                    lang={currentLang} 
                    sectors={sectorsList} 
                    lawyer={lawyer} />) : "" 
                }
            </Grid>
            {
                (lawyersList && limit == lawyersList.length) ? 
                (
                    <InfiniteLoader
                        onVisited={onVisited} 
                        visitStyle={{
                            marginTop: -100,
                            display: 'block'
                        }}
                        loaderStyle={{
                            display: 'none'
                        }}
                    />
                ) : ""
            }
        </Section>
    );
}

export default Calendar;
