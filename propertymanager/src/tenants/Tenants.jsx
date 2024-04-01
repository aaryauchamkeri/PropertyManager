import styles from './tenants.module.css';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Button, TextField} from '@mui/material';
import {Outlet, Link} from 'react-router-dom';
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
import { useContext, useEffect, useState } from 'react';
import { CredInfoCtx } from '../App';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
  display: 'flex',
  flexDirection: 'column',
  padding: '1em',
  gap: '1em'
}

export default function Tenants() {
    const location = useLocation();
    const [tenants, setTenants] = useState([]);
    const [displayNone, setDisplayNone] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [picture, setPicture] = useState();
    const [tempPictureUrl, setTempPictureUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [leaseStart, setLeaseStart] = useState('');
    const [leaseEnd, setLeaseEnd] = useState('');
    const [rent, setRent] = useState();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [searchBar, setSearchBar] = useState('');
    const infoContext = useContext(CredInfoCtx);
    const navigator = useNavigate();

    let fetchTenantData = async () => {
        let tenantsResponse = await fetch('http://localhost:3000/tenants/viewAll', {
            method: "GET",
            headers: {
                accountId: infoContext.accountId,
                Authorization: `Bearer ${infoContext.userData.auth}`
            }
        });

        let tenantResponseJson = await tenantsResponse.json();
        return tenantResponseJson;
    }

    useEffect(() => {
        (async () => {
            try {
                let tenantsResponse = await fetchTenantData();
                if(tenantsResponse.length) {
                    setTenants(tenantsResponse);
                    setDisplayNone(false);
                } else {
                    setTenants([]);
                }
            } catch (err) {

            }
        })()
    }, [])

    // check children paths
    if(!location.pathname.endsWith('/tenants')) {
        return (
            <>
                <Outlet/>
            </>
        )
    }

    async function addTenant() {
        try {
            let res = await fetch('http://localhost:3000/tenants/add', {
                method: 'POST',
                headers: {
                    'accountId': infoContext.accountId,
                    'Authorization': `Bearer ${infoContext.userData.auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: phone
                })
            });

            if (picture) {
                const newTenantId = (await res.json()).tenantId;
                let imageFormData = new FormData();
                imageFormData.append('pfp', picture);
                imageFormData.append('tenantId', newTenantId);
    
                await fetch('http://localhost:3000/tenants/addProfilePicture', {
                    method: 'POST',
                    headers: {
                        'accountId': infoContext.accountId,
                        'Authorization': `Bearer ${infoContext.userData.auth}`,
                    },
                    body:  imageFormData
                });
            }

            setPicture(null);
            setTempPictureUrl(null);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setLeaseStart(new Date());
            setLeaseEnd(new Date());
            setModalOpen(false);
        } catch (err) {
            console.log(err);
        }
    }

    async function updateTenantStatus(value, tenantId) {
        try {
            let res = await fetch(`http://localhost:30000/tenants/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${infoContext.userData.auth}`,
                    accountId: infoContext.accountId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tenantId: tenantId,
                    update: {
                        status: value
                    }
                })
            });

            setTenants(await fetchTenantData());
        } catch (err) {
            
        }
    }

    async function deleteTenant(tenantId, ind) {
        if(confirm('Are you sure you would like to delete this tenant? This action can\'t be undone.'))
        try {
            let res = await fetch(`http://localhost:30000/tenants/delete/${tenantId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${infoContext.userData.auth}`,
                    'accountId': infoContext.accountId
                }
            }).then(res => {
                window.location.reload();
            });
        } catch (err) {

        }
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drop(ev) {
        const file = ev.dataTransfer.files[0];
        let url = URL.createObjectURL(file);
        setPicture(file);
        setTempPictureUrl(url);
        ev.preventDefault();
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
                    <div style={{alignSelf: 'center'}} onDrop={(ev) => drop(ev)}
                        onDragOver={(ev) => {
                            allowDrop(ev);
                        }}>
                        <Avatar sx={{alignSelf: 'center', width: '5em', height: '5em'}}
                            src={tempPictureUrl ? tempPictureUrl : null}
                        />

                    </div>
                    <Box sx={{display: 'flex', flexDirection: 'row', padding: '0.5em', gap: '1em', justifyContent: 'center'}}>
                        <TextField label='First Name' sx={{width: '50%'}}
                            value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        ></TextField>
                        <TextField label='Last Name' sx={{width: '50%'}}
                            value={lastName} onChange={(e) => setLastName(e.target.value)}
                        ></TextField>
                    </Box>
                    <Button variant='contained'>
                        <UploadIcon/> Upload Tenant Contract
                    </Button>
                    <Box sx={{display: 'flex', flexDirection: 'row', padding: '0.5em', gap: '1em'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={dayjs(leaseStart)} label='Lease Start'
                                    onChange={(e) => {setLeaseStart(e)}}
                            />
                            <DatePicker value={dayjs(leaseEnd)} label='Lease End'
                                    onChange={(e) => {setLeaseEnd(e)}}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <TextField label='Monthly Rent' sx={{width: '100%'}}
                            inputProps={{type: 'number'}}
                            value={rent} onChange={(e) => {setRent(e.target.value)}}
                        >
                        </TextField>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <TextField label='Email Address' sx={{width: '100%'}}
                            InputProps={{startAdornment: <InputAdornment>
                                                            <EmailIcon/>
                                                         </InputAdornment>}}
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        >
                        </TextField>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <TextField label='Phone Number' sx={{width: '100%'}}
                            InputProps={{startAdornment: <InputAdornment>
                                                            <LocalPhoneIcon/>
                                                         </InputAdornment>}}
                            value={phone} onChange={(e) => setPhone(e.target.value)}
                        >
                        </TextField>
                    </Box>
                    <Button variant='contained' sx={{width: '3em', alignSelf: 'center'}}
                        onClick={addTenant}
                    >
                        Finish
                    </Button>
                </Box>
            </Modal>
            <div className={styles.main}>
                <div className={styles.tableContainer}>
                    <div className={styles.utilityContainer}>
                        <TextField id="outlined-basic" label="Search" size="small" fullWidth
                            variant="outlined" sx = {{backgroundColor: 'white', marginRight: '1em'}} 
                            onChange={(e) => {setSearchBar(e.target.value)}} 
                            value={searchBar}
                        />
                        <Button variant="contained" sx={{whiteSpace: 'nowrap'}}
                            onClick={() => setModalOpen(true)}>
                            <AddIcon fontSize='small' sx={{marginRight: '3px'}}/>
                            Add Tenant
                        </Button>
                    </div>
                    <TableContainer>
                        <Table style={{tableLayout: 'fixed'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        fontWeight: '600'}}>
                                        First Name
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        fontWeight: '600'}}>
                                        Last Name
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        fontWeight: '600'}}>
                                        Lease
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        fontWeight: '600'}}>
                                        Email
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        fontWeight: '600'}}>
                                        Phone
                                    </TableCell>
                                    <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                        paddingBottom: headCellStyle.paddingBottom,
                                                        fontWeight: '600'}}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    searchBar ? tenants.filter((tenant) => {
                                        return tenant.first_name.toLowerCase().startsWith(searchBar.toLowerCase()) 
                                        || tenant.last_name.toLowerCase().startsWith(searchBar.toLowerCase())
                                    }).map((val, ind) => {
                                        return (
                                            <TableRow sx={{backgroundColor: 'white'}}>
                                                <TableCell>
                                                    {val.first_name}
                                                </TableCell>
                                                <TableCell>
                                                    {val.last_name}
                                                </TableCell>
                                                <TableCell>
                                                    <select style={{color: val.status?'#4bcc00':'red'}}
                                                        onChange={(e) => {updateTenantStatus(e.target.value, val.id)}}
                                                        value={val.status}
                                                    >
                                                        <option value={1}>
                                                            ACTIVE
                                                        </option>
                                                        <option value={0}>
                                                            INACTIVE
                                                        </option>
                                                    </select>
                                                </TableCell>
                                                <TableCell>
                                                    {val.email}
                                                </TableCell>
                                                <TableCell>
                                                    {val.phone_number}
                                                </TableCell>
                                                <TableCell sx={{paddingTop: rowCellStyle.paddingTop,
                                                            paddingBottom: rowCellStyle.paddingBottom}}>
                                                    <Link to={`/tenants/${val.id}`}>
                                                        <IconButton onClick={() => {}}>
                                                            <VisibilityIcon sx = 
                                                                {{
                                                                    color: 'rgb(82, 191, 235)',
                                                                }}/>
                                                        </IconButton>
                                                    </Link>
                                                    {/* <IconButton onClick={() => {modifyTenant(val)}}>
                                                        <ModeEditIcon sx = 
                                                            {{
                                                                color: 'rgb(82, 235, 130)',
                                                            }}/>
                                                    </IconButton> */}
                                                    <IconButton onClick={() => {deleteTenant(val.id, ind)}}>
                                                        <DeleteIcon sx = 
                                                            {{
                                                                color: 'red',
                                                            }}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }) :
                                    tenants.map((val, ind) => {
                                        return (
                                            <TableRow sx={{backgroundColor: 'white'}}>
                                                <TableCell>
                                                    {val.first_name}
                                                </TableCell>
                                                <TableCell>
                                                    {val.last_name}
                                                </TableCell>
                                                <TableCell>
                                                    <select style={{color: val.status?'#4bcc00':'red'}}
                                                        onChange={(e) => {updateTenantStatus(e.target.value, val.id)}}
                                                        value={val.status}
                                                    >
                                                        <option value={1}>
                                                            ACTIVE
                                                        </option>
                                                        <option value={0}>
                                                            INACTIVE
                                                        </option>
                                                    </select>
                                                </TableCell>
                                                <TableCell>
                                                    {val.email}
                                                </TableCell>
                                                <TableCell>
                                                    {val.phone_number}
                                                </TableCell>
                                                <TableCell sx={{paddingTop: rowCellStyle.paddingTop,
                                                            paddingBottom: rowCellStyle.paddingBottom}}>
                                                    <Link to={`/tenants/${val.id}`}>
                                                        <IconButton onClick={() => {}}>
                                                            <VisibilityIcon sx = 
                                                                {{
                                                                    color: 'rgb(82, 191, 235)',
                                                                }}/>
                                                        </IconButton>
                                                    </Link>
                                                    <IconButton onClick={() => {deleteTenant(val.id, ind)}}>
                                                        <DeleteIcon sx = 
                                                            {{
                                                                color: 'red',
                                                            }}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={
                                {
                                    height: '30em', width: '100%', display: 
                                    displayNone ? 'flex': 'none',
                                    justifyContent: 'center', alignItems: 'center',
                                    
                                }
                            }>
                        <Typography variant='h4' sx={
                            {
                                color: 'gray',
                                fontStyle: 'italic'
                            }
                        }>
                            No Tenants
                        </Typography>            
                    </Box>
                </div>
            </div>  
        </>
    )
}