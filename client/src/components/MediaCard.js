import React from "react";
import Grid from '@mui/material/Grid';
import Topbar from './TopBar';
import LeftList from "./LeftList";
import RightCard from "./RightCard";
import { Button } from "@mui/material";
import shadows from '@mui/system';

export default function MediaCard(props) {
    return (
        <div>
            <Grid minHeight="10vh">
                <Grid></Grid>
            </Grid>
        <Grid
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            >
                <Grid item xs={10}>
                    <Topbar></Topbar>
                </Grid>
        </Grid>
        <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={1}
                    >
                <Grid item xs={2}>
                    <LeftList></LeftList>
                </Grid>
                <Grid item xs={4}>
                    <img src="https://place-puppy.com/300x300" />
                </Grid>
                
                <Grid item xs={4}>
                <RightCard></RightCard>
                </Grid>
        </Grid>
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={1}
        >
                <Grid item xs={6}></Grid>
                <Grid item xs={4} sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}>
                    <Button variant="contained"  style={{ margin: 20 }}> Left </Button>
                    <Button variant="outlined" style={{ margin: 20 }}> Flip </Button>
                    <Button variant="contained" style={{ margin: 20 }}> Right </Button>
                </Grid>        
        </Grid>
        
        </div>
    );
}
