import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Modal, Box, Button, Typography, TextField} from "@mui/material";
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
export default function NoteModal({open, setOpen, propertyId}) {
    const infoContext = useContext(CredInfoCtx);
    const [note, setNote] = useState();
    
    async function addNote() {
        try {
            await fetch(`https://propertymanager.onrender.com/properties/addnote/${propertyId}`, {
                method: 'POST',
                headers: {
                    'accountId': infoContext.accountId,
                    'Authorization': `Bearer ${infoContext.userData.auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    note: note,
                })
            });
            setOpen(false);
        } catch(e) {
            console.log(e);
        }
    }

    function textFieldChange(e) {
        setNote(e.target.value);
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
                    <TextField placeholder='Enter Note' fullWidth multiline
                                maxRows={12} onChange={textFieldChange} value={note}
                    />
                    <Button onClick={addNote} sx={{alignSelf: 'center'}}>FINISH</Button>
                </Box>
            </Box>
        </Modal>
    )
}