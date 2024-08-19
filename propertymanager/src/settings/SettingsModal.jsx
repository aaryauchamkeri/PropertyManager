import {Box, Modal, TextField, Button, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '97%',
  height: '97%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
//   justifyContent: 'center',
  alignItems: 'center',
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
                <Box sx={{height: '5%', width: '100%', display: 'flex', justifyContent: 'end'}}>
                    <IconButton onClick={() => {setOpen(false)}}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Box sx={{width: '70%', height: '90%', display: 'flex'}}>
                    
                </Box>
                <Box sx={{width: '100%', height: '5%', display: 'flex', justifyContent: 'center'}}>
                    <Box>
                        <Button variant='contained' color='error'
                            onClick={() => {deleteRefresh()}}
                        >
                            Sign out
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}