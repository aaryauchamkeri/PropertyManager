import {Box, Modal, TextField, Button, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

export default function FileModal({open, setOpen, tenantId}) {
    const infoContext = useContext(CredInfoCtx);
    const [file, setFile] = useState();

    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drop(ev) {
        const file = ev.dataTransfer.files[0];

        let url = URL.createObjectURL(file);
        setFile(file);
        ev.preventDefault();
    }

    async function addFile() {
        try {
            let formData = new FormData();
            formData.append('tenantId', tenantId);
            formData.append('files', file);
            let res = await fetch('http://localhost:3000/tenants/upload', {
                method: 'POST',
                headers: {
                    accountId: infoContext.accountId,
                    Authorization: `Bearer ${infoContext.userData.auth}`
                },
                body: formData
            });
            console.log(res);
            setOpen(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Modal open={open}>
            <Box sx={modalStyle}>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                          alignItems: 'center', padding: '0 0 0 1em'}}>
                    <div></div>
                    <Typography variant='h6'>DRAG FILE HERE</Typography>
                    <IconButton onClick={() => {setOpen(false)}}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <div style={{width: '90%', height: '4em', border: '1px dashed gray', 
                             alignSelf: 'center'}} 
                    onDrop={(ev) => {drop(ev)}}
                    onDragOver={(ev) => {allowDrop(ev)}}>

                    {file ? <Box sx={{
                                        width: '100%', height: '100%', borderRadius: '1em',
                                        display: 'flex', flexDirection: 'row',
                                        justifyContent: 'space-between', alignItems: 'center',
                                        backgroundColor: 'gray'
                                    }}>
                        {file.name}
                        <IconButton onClick={() => {setFile(null)}}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>: <></>}
                </div>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start',
                          padding: '0 1em 1em 1em'}}>
                    
                    <Button onClick={addFile} sx={{alignSelf: 'center'}}>FINISH</Button>
                </Box>
            </Box>
        </Modal>
    )
}