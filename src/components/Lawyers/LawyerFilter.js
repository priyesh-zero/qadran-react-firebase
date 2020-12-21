import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

// Material UI imports
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    TextField
} from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete';

// Language Dictionary
import LanguageDict from './Languages.Dictionary'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const LawyerFilter = ({ language, setLanguage, setFilter, sectors, lang, setSectorFilter, sector }) => {

    const classes = useStyles()

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            {sectors ?
            (<Grid
            item
            xs={12}
            sm={6}
            > 
                {/* <Autocomplete
                id="Sector-list"
                onChange={(e, change) => setFilter(setSectorFilter, change ? change.id : '')}
                options={sectors}
                getOptionLabel={(option) => option.title[lang]}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Search for Sectors" />}
                /> */}
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Matter</InputLabel>
                    <Select
                        className={classes.selectList}
                        value={sector}
                        onChange={e => setFilter(setSectorFilter, e.target.value)}
                    >
                        <MenuItem value="">
                        <em>All</em>
                        </MenuItem>
                        {
                            sectors.map(sector => <MenuItem key={sector.id} value={sector.id}>{sector.title[lang]}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>) : ""}
            <Grid
            item
            xs={12}
            sm={3}
            >
                 <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Language</InputLabel>
                    <Select
                        className={classes.selectList}
                        value={language}
                        onChange={e => setFilter(setLanguage, e.target.value)}
                    >
                        <MenuItem value="">
                        <em>All</em>
                        </MenuItem>
                        {
                            Object.entries(LanguageDict).map(([key, value]) => <MenuItem key={key} value={key}>{value}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default LawyerFilter