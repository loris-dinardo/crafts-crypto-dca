import React from "react";
import {AppBar, createStyles, Grid, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
        root: {
            flexGrow: 1,
            flexWrap: "wrap",
            zIndex: theme.zIndex.drawer + 1,
        },
        appBar: {
            boxShadow: 'none'
        },
        toolBar: {
            minHeight: '50px',
        },
        title: {
            flexGrow: 1,
            marginRight: '5px',
            paddingTop: '2px',
        },
        appTitle: {
            marginLeft: '8px',
            paddingLeft: '8px',

        },
    }),
);

export const Header: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Grid container alignItems="center" className={classes.title}>
                        <Typography className={classes.appTitle} variant="h4">
                            Crypto Craft
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}