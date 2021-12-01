import React from "react";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import NotFoundImage from "./NotFound.png";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            height: `calc(100vh - ${theme.spacing(8)}px)`,
        },
        container: {
            height: "100%",
        },
    }),
);

export const NotFound: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Grid container justify="center" alignItems="center" direction="column" className={classes.container}>
                <img src={NotFoundImage} alt={"not found icon"} style={{width: 370, height: 200}}/>
                <h1>Page not found</h1>
                <Link to="/" className="btn btn-primary">Return to home</Link>
            </Grid>
        </div>
    );
}