import styles from './calendar.module.css';
import {Modal, Typography, IconButton, TextField, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullCalendar from '@fullcalendar/react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useContext, useEffect, useState } from 'react';
import { CredInfoCtx } from '../../App';
import dayjs from 'dayjs';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '60%',
  width: '30%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column'
};


export default function Calendar() {
    const infoCtx = useContext(CredInfoCtx);
    const [modalOpen, setModalOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        (async () => {
            let res = await (await fetch('http://localhost:3000/schedule/view', {
                method: "GET",
                headers: {
                    'accountId': 1,
                    'Authorization': `Bearer ${infoCtx.userData.auth}`
                }
            })).json();
            setEvents(res);
        })()
    }, []);

    function setTimeF(e) {
        let timeDate = e.$d;
        date.setHours(timeDate.getHours() || 0);
        date.setMinutes(timeDate.getMinutes() || 0);
        date.setSeconds(timeDate.getSeconds() || 0);
        console.log(date);
        setDate(date);
    }

    function addEvent() {
        fetch('http://localhost:3000/schedule/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${infoCtx.userData.auth}`,
                'accountId': 1
            }, 
            body: JSON.stringify({
                title: title,
                description: description,
                date: date
            })
        }).then(val => {
            setModalOpen(false);
        }).catch(err => {
            console.log(err);
        })
    }



    return (
        <div className={styles.main}>
            <Modal open={modalOpen}>
                <div style={{...style}}>
                    <div className={styles.header}>
                        <Typography variant='h5'>
                            Add Event
                        </Typography>
                        <IconButton onClick={() => setModalOpen(false)}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className={styles.dateBody}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Typography variant='h6'>*Set Date:</Typography>
                            <div className={styles.dateAndTime}>
                                <DatePicker value={dayjs(date)}/>
                                <TimePicker onChange={(e) => {setTimeF(e)}}/>
                            </div>
                        </LocalizationProvider>
                        <div style={{marginTop: '0.5em', width: '100%'}}>
                            <Typography variant='h6'>*Title:</Typography>
                            <TextField 
                                sx={{width: '100%'}}
                                placeholder='Title'
                                onChange={(e) => {setTitle(e.target.value)}}
                            ></TextField>
                        </div>
                        <div style={{marginTop: '0.5em', width: '100%'}}>
                            <Typography variant='h6'>Description:</Typography>
                            <TextField 
                                sx={{width: '100%'}}
                                multiline
                                rows={5}
                                placeholder='Description'
                                onChange={(e) => setDescription(e.target.value)}
                            ></TextField>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button variant='contained'
                            onClick={() => {addEvent()}}
                        >Create</Button>
                    </div>
                </div>
            </Modal>
            <FullCalendar
                plugins={[ dayGridPlugin,
                           timeGridPlugin,
                           interactionPlugin
                        ]}
                headerToolbar={{
                    left: 'prev next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                events={
                    events.map(value => {
                        return {
                            title: value.title,
                            start: new Date(value.date)
                        }
                    })
                }
                dateClick={function(args) {
                    const clickDate = args.date;
                    const today = new Date();
                    if(clickDate.valueOf() >= today.valueOf() || clickDate.getDate() == today.getDate()) {
                        setDate(clickDate);
                        setModalOpen(true);
                    }
                }}
                views = {["dayGridMonth", "dayGridWeek", "dayGridDay"]}
                height="100%"
            />
        </div>
    )
}



