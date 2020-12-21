import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    Grid,
    Chip
} from '@material-ui/core'

import { 
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    ExpandMore as ExpandMoreIcon ,
    MoreVert as MoreVertIcon
 } from '@material-ui/icons'

import { red } from '@material-ui/core/colors'

import Language from './Languages.Dictionary'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  grid: {
    padding: '10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  chip: {
      margin: '5px',
      backgroundColor: 'rgba(251, 185, 101, 1)',
      color: '#ffffff'
  }
}));

// Helper Functions
const getInitials = ({ first, last}) => `${first[0]}${last[0]}`

const getName = ( { first, last } ) => `${first} ${last}`

// Helper Components

const LanguageComponent = ({ lang }) => {
    const classes = useStyles();
    return (
        <Chip label={Language[lang]} className={classes.chip} variant="outlined" />
    )
}

const SectorComponent = ({ sector, lang }) => {
    return (
        <Fragment>
            <Typography variant='subtitle2'>
                {sector.title[lang]}
            </Typography>
            <Typography paragraph>
                {sector.description[lang]}
            </Typography>
        </Fragment>
    )
}

// Main Component

export default function LawyerView({ lawyer, lang, sectors }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
        <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {getInitials(lawyer)}
                </Avatar>
                }
                title={getName(lawyer)}
                subheader="Lawyer"
            />
            <CardMedia 
                className={classes.media}
                image={`https://source.unsplash.com/500x280/?lawyer,${lawyer.last}`}
                title={getName(lawyer)}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Language of Choice for Practices:<br />
                    { Object.entries(lawyer.languages).map( ([key, value]) => <LanguageComponent className={classes.chip} lang={key} /> ) }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <Typography variant='subtitle2'>More</Typography>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography variant='subtitle1'>Sectors:</Typography>
                {
                    Object.entries(lawyer.sectors
                        ).map(([key, value]) => {
                        if (value) {
                            const sector = sectors.find(sec => sec.id === key)
                            return <SectorComponent key={key} lang={lang} sector={sector} />
                        } else {
                            return ""
                        }
                    })
                }
                </CardContent>
            </Collapse>
            </Card>
    </Grid>
  );
}
