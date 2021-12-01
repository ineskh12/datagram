import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright ©  Ines khelifi'}
          
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function ContentAndFooter(props) {
    const { children } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
               
            }}
        >
         
            <Container component="main" sx={{ mt: 20, mb: 2 }} maxWidth="lg">
                
                {children}
            </Container>
            
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                       Ines khelifi
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
            
        </Box>
    );
}