import {Modal, Box, Typography, TextField, Button, IconButton,
        Divider, InputAdornment} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  padding: '1em',
  gap: '1em'
}

export default function EditModal({open, setModalOpen, property}) {
    const [address, setAddress] = useState(property ? property.address: '');
    const [currencyType, setCurrencyType] = useState(property ? property.currency_type: '');
    const [hEmail, setHEmail] = useState(property ? property.housing_company_email: '');
    const [hName, setHName] = useState(property ? property.housing_company_name: '');
    const [hNumber, setHNumber] = useState(property ? property.housing_company_number: '');
    const [jEmail, setjEmail] = useState(property ? property.janitor_email: '');
    const [jNumber, setJNumber] = useState(property ? property.janitor_number: '');
    const [pPrice, setPPrice] = useState(property ? property.purchase_price: '');

    console.log(property);

    return (
        <Modal open={open}>
            <Box sx={{...style}}>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row',
                                justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant='h5'>Update Property</Typography>
                    <IconButton onClick={() => {setModalOpen(false)}}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center'}}>
                    <TextField label='First Name' sx={{width: '50%'}}
                        onChange={(e) => {}}
                    ></TextField>
                    <TextField label='Last Name' sx={{width: '50%'}}
                        onChange={(e) => {}}
                    ></TextField>
                </Box>
                {/* <Box sx={{display: 'flex', flexDirection: 'row', padding: '0.5em', gap: '1em'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label='Lease Start'
                                onChange={(e) => {}}
                        />
                        <DatePicker label='Lease End'
                                onChange={(e) => {}}
                        />
                    </LocalizationProvider>
                </Box> */}
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center'}}>
                    <TextField label='First Name' sx={{width: '50%'}}
                        onChange={(e) => {}}
                    ></TextField>
                    <TextField label='Last Name' sx={{width: '50%'}}
                        onChange={(e) => {}}
                    ></TextField>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center'}}>
                    <TextField label='First Name' sx={{width: '50%'}}
                        onChange={(e) => {}}
                    ></TextField>
                    <TextField label='Last Name' sx={{width: '50%'}}
                        onChange={(e) => {}}
                    ></TextField>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'center'}}>
                    <TextField label='First Name' sx={{width: '50%'}}
                        onChange={(e) => {}}
                    ></TextField>
                    <TextField label='Last Name' sx={{width: '50%'}}
                        onChange={(e) => {}}
                    ></TextField>
                </Box>
                <Button variant='contained' sx={{width: '3em', alignSelf: 'center'}}
                    onClick={() => {}}
                >
                    Finish
                </Button>
            </Box>
        </Modal>
    );
}