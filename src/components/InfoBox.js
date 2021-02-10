import React from 'react'
import { Card, CardContent, Typography, makeStyles} from '@material-ui/core'
import './infoBox.css'; 



function InfoBox({title,cases,total, backGroundColor}) {
    const useStyles = makeStyles({

        root: {
            minWidth: 275,
            backgroundColor: backGroundColor,
          },
          bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
          },
          title: {
            fontSize: 18,
          },
          pos: {
            marginBottom: 12,
          },
    
    })
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className="">
                <Typography className={classes.title} color="textSecondary">
                    {title}
                </Typography>
                <Typography className="" color="textPrimary">
                    +{cases}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
