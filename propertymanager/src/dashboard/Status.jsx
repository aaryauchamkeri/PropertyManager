import styles from './dashboard.module.css';
import {Box, Typography} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Status({totalProperties, activeProperties, totalTenants, activeTenants}) {

    console.log(activeProperties);
    console.log(activeTenants);
    return (
        <div className={styles.status}>
            <Box sx={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                gap: '1em', padding: '1em',
            }}>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'start',
                    alignItems: 'center', gap: '0.5em'
                }}>
                    <AssignmentIndIcon/>
                    <Typography variant='h5' sx={{
                        fontWeight: 'bold', alignSelf: 'start',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        marginRight: '0.5em'
                    }}>
                        Account Status
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',
                          alignItems: 'center', height: '40%'}}>
                    <PieChart
                        series={[
                            {
                            data: [
                                { id: 0, value: totalProperties-activeProperties, label: 'Inactive Properties'},
                                { id: 1, value: activeProperties, label: 'Active Properties'},
                            ],
                            },
                        ]}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',
                          alignItems: 'center', height: '40%'}}>
                    <PieChart
                        series={[
                            {
                            data: [
                                { id: 0, value: totalTenants-activeTenants, label: 'Total Tenants' },
                                { id: 1, value: activeTenants, label: 'Active Tenants' },
                            ],
                            },
                        ]}
                    />
                </Box>
            </Box>
        </div>
    )
}