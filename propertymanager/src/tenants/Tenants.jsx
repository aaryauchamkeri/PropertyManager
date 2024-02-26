import styles from './tenants.module.css';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Button, TextField} from '@mui/material';
import {Outlet} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import {TableContainer, Table, TableHead, TableRow, TableCell, TablePagination,
        TableBody, Modal, Box, Divider, Avatar, InputAdornment} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useRef, useState } from 'react';
import { CredInfoCtx } from '../App';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// styles for cells
const headCellStyle = {
    paddingTop: '0.7em',
    paddingBottom: '0.7em'
}

const rowCellStyle = {
    paddingTop: '0.3em',
    paddingBottom: '0.3em'
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  backgroundColor: 'white',
  border: '2px solid #000',
  display: 'flex',
  flexDirection: 'column',
  padding: '1em',
  gap: '1em'
}

export default function Tenants() {
    const location = useLocation();
    const [tenants, setTenants] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const infoContext = useContext(CredInfoCtx);
    const navigator = useNavigate();

    useEffect(() => {
        (async () => {
            let tenantsResponse = await fetch('http://localhost:3000/tenants/viewAll', {
                method: "GET",
                headers: {
                    accountId: 1,
                    Authorization: `Bearer ${infoContext.userData.auth}`
                }
            });

            setTenants(await tenantsResponse.json());
        })()
    }, [])

    // check children paths
    if(location.pathname.endsWith('/add')) {
        return (
            <>
                <Outlet/>
            </>
        )
    }

    function handleAddTenantClick(e) {
        navigator('/tenants/add');
    }

    return (
        <>  
            <Modal open={modalOpen}>
                <Box sx={{...style}}>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row',
                                 justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant='h5'>Add Tenant</Typography>
                        <IconButton onClick={() => {setModalOpen(false)}}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <Box sx={{display: 'flex', flexDirection: 'row', padding: '0.5em', gap: '1em'}}>
                        <Avatar sx={{height: '3em', width: '3em', backgroundColor: 'red'}}>Hp</Avatar>
                        <TextField label='First Name'></TextField>
                        <TextField label='Last Name'></TextField>
                    </Box>
                    <Button variant='contained'>
                        <UploadIcon/> Upload Tenant Contract
                    </Button>
                    <Box sx={{display: 'flex', flexDirection: 'row', padding: '0.5em', gap: '1em'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={dayjs(new Date())} label='Lease Start'/>
                            <DatePicker value={dayjs(new Date())} label='Lease End'/>
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <TextField label='Email Address' sx={{width: '100%'}}
                            InputProps={{startAdornment: <InputAdornment>
                                                            <EmailIcon/>
                                                         </InputAdornment>}}
                        >
                        </TextField>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <TextField label='Phone Number' sx={{width: '100%'}}
                            InputProps={{startAdornment: <InputAdornment>
                                                            <LocalPhoneIcon/>
                                                         </InputAdornment>}}
                        >
                        </TextField>
                    </Box>
                    <Button variant='contained' sx={{width: '3em', alignSelf: 'center'}}>
                        Finish
                    </Button>
                </Box>
            </Modal>
            <div className={styles.main}>
                <Typography variant='h6' sx={{marginBottom: '0.5em'}}>Tenants</Typography>
                <div className={styles.tableContainer}>
                    <div className={styles.utilityContainer}>
                        <TextField id="outlined-basic" label="Search" size="small" fullWidth
                            variant="outlined" sx = {{backgroundColor: 'white', marginRight: '1em'}} />
                        <Button variant="contained" sx={{whiteSpace: 'nowrap'}}
                            onClick={() => setModalOpen(true)}>
                            <AddIcon fontSize='small' sx={{marginRight: '3px'}}/>
                            Add Tenant
                        </Button>
                    </div>
                    <TableContainer>
                        <Table style={{tableLayout: 'fixed'}}>
                            <TableHead>
                                <TableRow sx={{backgroundColor: 'rgb(20, 20, 20)',
                                        color: 'white'}}>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        color: 'white'}}>
                                        First Name
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        color: 'white'}}>
                                        Last Name
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        color: 'white'}}>
                                        Monthly Rent
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        color: 'white'}}>
                                        Lease Start
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        color: 'white'}}>
                                        Lease End
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        color: 'white'}}>
                                        Property Id
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        color: 'white'}}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tenants.map((val, ind) => {
                                        return (
                                            <TableRow sx={{backgroundColor: 
                                                    ind % 2 == 0 ? 'white': 'rgb(245, 245, 245)'}
                                            }>
                                                <TableCell>
                                                    {val.first_name}
                                                </TableCell>
                                                <TableCell>
                                                    {val.last_name}
                                                </TableCell>
                                                <TableCell>
                                                    {val.monthly_rent || 'N/A'}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>  
        </>
    )
}