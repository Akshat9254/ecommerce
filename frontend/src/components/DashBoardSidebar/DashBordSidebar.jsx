import { Card, Container, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

const DashBordSidebar = () => {
    const [value, setValue] = useState(0)
    return (
        <Card>
            <Container sx={{ paddingY: 4 }}>
                <Typography variant='h6' align='center'>Dashboard</Typography>
                <Tabs
                    orientation="vertical"
                    // variant="scrollable"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    aria-label="Vertical tabs example"
                    sx={{ borderColor: 'divider' }}
                >
                    <Tab label='My Orders' iconPosition='start' />
                    <Tab label='My Profile' />
                    <Tab label='Cart' />
                </Tabs>
            </Container>
        </Card>
    )
};

export default DashBordSidebar;
