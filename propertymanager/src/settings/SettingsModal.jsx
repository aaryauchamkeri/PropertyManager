import {Box, Modal, TextField, Button, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5em 1em 1em 1em',
  gap: '0.5em'
};


export default function SettingsModal({open, setOpen}) {

    function deleteRefresh() {
        document.cookie = `refresh=;expires=${new Date(0).toUTCString()}`
        window.location.reload();
    }

    return (
        <Modal open={open}>
            <Box sx={modalStyle}>
                <IconButton sx={{alignSelf: 'end'}} onClick={() => {setOpen(false)}}>
                    <CloseIcon/>
                </IconButton>
                <Button variant='contained' color='error'
                    onClick={() => {deleteRefresh()}}
                >
                    Sign out
                </Button>
            </Box>
        </Modal>
    )
}