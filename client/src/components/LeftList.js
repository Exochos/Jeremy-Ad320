import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


export default function LeftList() {
    return (
        <List 
        component="nav"
        sx={{
            fontSize: "1.2rem",
        }}>
            <div>
            <ListItem>
                <u>Card A</u>
            </ListItem>
            <ListItem>
                Card B
            </ListItem>
            <ListItem>
                Card C
            </ListItem>
            <ListItem>
                Card D
            </ListItem>
            <ListItem>
                Card E
            </ListItem>
            <ListItem>
                Card F
            </ListItem>
            </div>
        </List>
    );
}
