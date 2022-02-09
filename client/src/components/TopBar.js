import Box from '@mui/material/Box';
import React from 'react';


export default function Topbar() {
    return (
        <Box 
            component="header"
            sx={{
                width: "100%",
                p:2,
                border: "1px solid",
                borderRadius: "5px",
                fontSize: "1.5rem",
            }}
            style={{
                background: 'linear-gradient(to right, rgba(2,0,36,1) 0%, rgba(0,125,212,0.6082808123249299) 0%, rgba(0,212,255,1) 100%'
            }}
            >
            <h2>Notable</h2>
        </Box>
    );
}


