import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Modal, Box, Button, Typography, TextField} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { CredInfoCtx } from '../../App';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column'
};
export default function TaskModal({open, setOpen, propertyId}) {
    const infoContext = useContext(CredInfoCtx);
    const [deadline, setDeadline] = useState(new Date());
    const [description, setDescription] = useState('');
    
    async function addTask() {
        console.log(deadline);
        console.log(description);
        try {
            await fetch(`http://localhost:3000/properties/addtask/${propertyId}`, {
                method: 'POST',
                headers: {
                    'accountId': infoContext.accountId,
                    'Authorization': `Bearer ${infoContext.userData.auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deadline: deadline.toISOString().split('T')[0],
                    task: description,
                    calendar: false
                })
            });
            setOpen(false);
        } catch(e) {
            console.log(e);
        }
    }

    function textFieldChange(e) {
        setDescription(e.target.value);
    }

    return (
        <Modal open={open}>
            <Box sx={modalStyle}>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                    <IconButton onClick={() => {setOpen(false)}}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start',
                          padding: '0 1em 1em 1em'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Typography variant='h6'>
                                Set Deadline
                            </Typography>
                            <DatePicker value={dayjs(deadline)} sx={{width: '100%'}}
                                onChange={(e) => {setDeadline(e)}}
                            />
                            <Typography variant='h6' sx={{marginTop: '1em'}}>
                                Add Description
                            </Typography>
                            <TextField placeholder='Description' fullWidth multiline
                                        maxRows={12} onChange={textFieldChange} value={description}
                            />
                        </LocalizationProvider>
                    <Button onClick={addTask} sx={{alignSelf: 'center'}}>FINISH</Button>
                </Box>
            </Box>
        </Modal>
    )
}