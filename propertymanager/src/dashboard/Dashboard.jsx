import styles from './dashboard.module.css';
import {Box, Typography} from '@mui/material'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { CredInfoCtx } from '../App';
import { useContext, useEffect, useState } from 'react';


export default function Dashboard() {
    const infoContext = useContext(CredInfoCtx);
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/schedule/view', {
            method: 'GET',
            headers: {
                'accountId': 1,
                'Authorization': `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then((data) => {
            data = data.map(elem => {
                if(new Date(elem.date).getTime() > new Date().getTime()) return elem;
            });
            data = data.filter();
            data.sort(function (a, b) {
                let aDate = new Date(a.date);
                let bDate = new Date(b.date);
                if(aDate.getTime() > bDate.getTime()) return 1;
                return -1;
            });
            console.log(data);
            setAllEvents(data);
        });

        fetch('http://localhost:3000/tenants/tasks/alltasks', {
            method: 'GET',
            headers: {
                'accountId': 1,
                'Authorization': `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
        });

        fetch('http://localhost:3000/properties/tasks/alltasks', {
            method: 'GET',
            headers: {
                'accountId': 1,
                'Authorization': `Bearer ${infoContext.userData.auth}`
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
        });
    }, []);


    return (
        <div className={styles.parent}>
            <div className={styles.calendar}>
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', padding: '1em'}}>
                    <Typography variant="h4" sx={{textDecoration: 'underline', 
                                                  textDecorationColor: 'blue',
                                                  fontStyle: 'italic', flex: 0.1}}>
                        Upcoming Events
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
                                            {elem.description ||  "No description provided"}
                                        </Typography>
                                    </Box>
                                )
                            }) : <Box sx={{
                                    width: '100%', height: '100%', display: 'flex',
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Typography variant='h5' color='gray' sx={{
                                        alignSelf: 'center', position: 'relative',
                                        left: '-0.5em', fontStyle: 'italic'
                                    }}>
                                        No upcoming events
                                    </Typography>
                                 </Box>
                        }
                    </Box>
                </Box>
            </div>
            <div className={styles.tasks}>
                <Box sx={{
                    width: '50%', height: '100', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '1em', padding: '1em', borderRight: 'solid 0.5px gray'
                }}>
                    <Typography variant='h4' sx={{
                        textDecoration: 'underline', textDecorationColor: 'blue',
                        fontStyle: 'italic'
                    }}>
                        Upcoming Tenant Tasks
                    </Typography>
                    
                </Box>
                <Box sx={{
                    width: '50%', height: '100', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '1em', padding: '1em', borderLeft: 'solid 0.5px gray'
                }}>
                    <Typography variant='h4' sx={{
                        textDecoration: 'underline', textDecorationColor: 'blue',
                        fontStyle: 'italic'
                    }}>
                        Upcoming Property Tasks
                    </Typography>

                </Box>
            </div>
        </div>
    ); 
}