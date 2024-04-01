import styles from './dashboard.module.css';
import {Box, Typography, Button, ButtonGroup, Chip, Divider} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


export default function EventsWidget({allEvents}) {
    return (
        <div className={styles.calendar}>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', padding: '1em'}}>
                <Typography variant='h5' sx={{
                    fontWeight: 'bold', alignSelf: 'start',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <CalendarMonthIcon sx={{marginRight: '0.5em'}}/> Upcoming Events
                </Typography>
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1em',
                            overflow: 'scroll', padding: '1em 0 0 0'}}>
                    {
                        allEvents.length ? allEvents.map(elem => {
                            return (
                                <Box sx={{
                                    width: '100%', height: '4em', borderRadius: '0.3em',
                                    borderLeft: 'solid 5px rgb(61, 171, 255)', paddingLeft: '0.5em',
                                    display: 'flex', flexDirection: 'column'
                                }}> 
                                    <Box sx={{
                                        display: 'flex', justifyContent: 'space-between',
                                        overflowX: 'hidden'
                                    }}>
                                        <Typography variant='h6'>
                                            {elem.title}
                                        </Typography>
                                        <Typography variant='subtitle1' color='gray'>
                                            {new Date(elem.date).toDateString()}
                                        </Typography>
                                    </Box>
                                    <Typography variant='subtitle1' color='gray'>
                                        {"Description: " + elem.description ||  
                                            "No description provided"}
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
                                    No upcoming events
                                </Typography>
                            </Box>
                    }
                </Box>
            </Box>
        </div>
    )
}