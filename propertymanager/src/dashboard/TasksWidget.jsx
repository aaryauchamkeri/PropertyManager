import styles from './dashboard.module.css';
import {Box, Typography, Button, ButtonGroup, Chip, Divider} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function TasksWidget({propertyTasks, tenantTasks}) {
    return (
        <div className={styles.tasks}>
            <Box sx={{
                width: '50%', height: '100%', display: 'flex', flexDirection: 'column',
                gap: '1em', padding: '1em', borderRight: 'solid 0.5px gray'
            }}>
                <Box sx={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'start',
                    alignItems: 'center', gap: '0.5em'
                }}>
                    <AssignmentIcon/>
                    <Typography variant='h5' sx={{
                        fontWeight: 'bold', alignSelf: 'start',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        marginRight: '0.5em'
                    }}>
                        Upcoming Property Tasks
                    </Typography>
                </Box>
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1em',
                            overflow: 'scroll'}}>
                    {
                        propertyTasks.length ? propertyTasks.map(elem => {
                            return (
                                <Box sx={{
                                    width: '100%', borderRadius: '0.3em',
                                    borderLeft: 'solid 5px #fc5203', 
                                    paddingLeft: '0.5em', display: 'flex',
                                    flexDirection: 'column'
                                }}> 
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'space-between',
                                        overflowX: 'hidden'
                                    }}>
                                        <Typography variant='subtitle1'>
                                            {elem.task}
                                        </Typography>
                                        <Typography variant='subtitle2' color='gray'>
                                            Deadline: {new Date(elem.deadline).toDateString()}
                                        </Typography>
                                    </Box>
                                    <Typography variant='subtitle2' color='gray'>
                                        Property Address: {elem.address ||  "N/A"}
                                    </Typography>
                                </Box>
                            )
                        }) : <Box sx={{
                                width: '100%', height: '100%', display: 'flex',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Typography variant='h5' color='gray' sx={{
                                    alignSelf: 'center', position: 'relative',
                                    left: '-0.5em', fontStyle: 'italic',
                                    textWrap: 'nowrap'
                                }}>
                                    No upcoming tasks
                                </Typography>
                            </Box>
                    }
                </Box>
            </Box>
            <Box sx={{
                width: '50%', height: '100', display: 'flex', flexDirection: 'column',
                gap: '1em', padding: '1em'
            }}>
                <Typography variant='h5' sx={{
                    fontWeight: 'bold', alignSelf: 'start',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <AssignmentIcon sx={{marginRight: '0.5em'}}/> Upcoming Tenant Tasks
                </Typography>
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1em',
                            overflow: 'scroll'}}>
                    {
                        tenantTasks.length ? tenantTasks.map(elem => {
                            return (
                                <Box sx={{
                                    width: '100%', borderRadius: '0.3em',
                                    borderLeft: 'solid 5px #bfb300', 
                                    paddingLeft: '0.5em', display: 'flex',
                                    flexDirection: 'column'
                                }}> 
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'space-between',
                                        overflowX: 'hidden'
                                    }}>
                                        <Typography variant='subtitle1'>
                                            {elem.task}
                                        </Typography>
                                        <Typography variant='subtitle2' color='gray'>
                                            Deadline: {new Date(elem.deadline).toDateString()}
                                        </Typography>
                                    </Box>
                                    <Typography variant='subtitle2' color='gray'>
                                        Tenant: {elem.first_name + ' ' + elem.last_name ||  "N/A"}
                                    </Typography>
                                </Box>
                            )
                        }) : <Box sx={{
                                width: '100%', height: '100%', display: 'flex',
                                justifyContent: 'center', alignItems: 'center'
                             }}>
                                <Typography variant='h5' color='gray' sx={{
                                    alignSelf: 'center', position: 'relative',
                                    left: '-0.5em', fontStyle: 'italic',
                                    textWrap: 'nowrap'
                                }}>
                                    No upcoming tasks
                                </Typography>
                            </Box>
                    }
                </Box>
            </Box>
        </div>
    )
}