import styles from './properties.module.css';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Button, TextField, Box} from '@mui/material';
import {Outlet} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { CredInfoCtx } from '../App';
import {TableContainer, Table, TableHead, TableRow, TableCell, TablePagination,
        TableBody} from '@mui/material';
import {Link} from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const headCellStyle = {
    paddingTop: '0.7em',
    paddingBottom: '0.7em'
}

const rowCellStyle = {
    paddingTop: '0.3em',
    paddingBottom: '0.3em'
}


export default function Properties() {
    const infoContext = useContext(CredInfoCtx);
    const tableHeads = useRef(['No', 'Address', 'Purchase Price', 'Tenants', 'Status', 'Actions']);
    const [searchBar, setSearchBar] = useState('');
    const location = useLocation();
    const navigator = useNavigate();
    const [displayNone, setDisplayNone] = useState(true);
    const [properties, setProperties] = useState([]);
    
    const fetchPropertyData = async () => {
        try {
            let propertiesResponse = await fetch('https://propertymanager.onrender.com/properties/list', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${infoContext.userData.auth}`,
                    'accountId': infoContext.accountId
                }
            });
            propertiesResponse = await propertiesResponse.json();
            console.log(propertiesResponse);
            return propertiesResponse;
        } catch (err) {
            return [];
        }
    }

    // for retrieving data about the properties and tenants
    useEffect(() => {
        (async () => {
            try {
                let propertiesResponse = await fetchPropertyData();
                if(propertiesResponse.length) {
                    setProperties(propertiesResponse);
                    setDisplayNone(false);
                }
            } catch (err) {

            }
        })();
    }, []);

    // check children paths
    if(!location.pathname.endsWith('/properties')) {
        return (
            <>
                <Outlet/>
            </>
        )
    }

    function handleAddPropertyClick(e) {
        navigator('/properties/add');
    }

    async function deleteProperty(propertyId, index) {
        const confirmDelete = window.confirm('Are you sure you want to delete this property? This action cannot be undone!')
        let res = await fetch(`https://propertymanager.onrender.com/properties/delete/${propertyId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${infoContext.userData.auth}`,
                'accountId': infoContext.accountId
            },
            body: JSON.stringify({'propertyId': propertyId})
        }).then(res => {
            window.location.reload();
        });
    } 

    async function updatePropertyStatus(value, propertyId) {
        try {
            let res = await fetch(`https://propertymanager.onrender.com/properties/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${infoContext.userData.auth}`,
                    accountId: infoContext.accountId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    propertyId: propertyId,
                    update: {
                        status: value
                    }
                })
            });

            setProperties(await fetchPropertyData())
        } catch (err) {

        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.tableContainer}>
                <div className={styles.utilityContainer}>
                    <TextField id="outlined-basic" label="Search" size="small" fullWidth
                        variant="outlined" sx = {{backgroundColor: 'white', marginRight: '1em'}} 
                        onChange={(e) => {setSearchBar(e.target.value)}} value={searchBar}
                    />
                    <Button variant="contained" sx={{whiteSpace: 'nowrap'}}
                        onClick={handleAddPropertyClick}>
                        <AddIcon fontSize='small' sx={{marginRight: '3px'}}/>
                        Add Property
                    </Button>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                    paddingBottom: headCellStyle.paddingBottom,
                                                    fontWeight: '600'}}>
                                                    No  
                                                </TableCell>
                                <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                    paddingBottom: headCellStyle.paddingBottom,
                                                    fontWeight: '600'}}>
                                                    Address   
                                                </TableCell>
                                <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                    paddingBottom: headCellStyle.paddingBottom,
                                                    fontWeight: '600'}}>
                                                    Purchase Price
                                                </TableCell>
                                <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                    paddingBottom: headCellStyle.paddingBottom,
                                                    fontWeight: '600'}}>
                                                    Maintenance Costs
                                                </TableCell>
                                <TableCell sx={{paddingTop: headCellStyle.paddingTop,
                                                    paddingBottom: headCellStyle.paddingBottom,
                                                    fontWeight: '600'}}>
                                                    Status
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
                                searchBar ? properties.filter((property) => {
                                    return property.address.startsWith(searchBar.toLowerCase());
                                }).map((val, index) => {
                                    return (
                                        <TableRow sx={{backgroundColor: 'white'}} key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{val.address}</TableCell>
                                            <TableCell>{val.purchase_price || 'N/A'}</TableCell>
                                            <TableCell>{val.maintenance_costs || 'N/A'}</TableCell>
                                            <TableCell>
                                                <select style={{color: val.status?'#4bcc00':'red'}}
                                                        onChange={(e) => {updatePropertyStatus(e.target.value, val.id)}}
                                                        value={val.status}
                                                >
                                                    <option value={1}>
                                                        Occupied
                                                    </option>
                                                    <option value={0}>
                                                        Vacant
                                                    </option>
                                                </select>
                                            </TableCell>
                                            <TableCell sx={{paddingTop: rowCellStyle.paddingTop,
                                                            paddingBottom: rowCellStyle.paddingBottom}}>
                                                <Link to={`/properties/${val.id}`}>
                                                    <IconButton onClick={() => {}}>
                                                        <VisibilityIcon sx = 
                                                            {{
                                                                color: 'rgb(82, 191, 235)',
                                                            }}/>
                                                    </IconButton>
                                                </Link>
                                                <IconButton onClick={() => {deleteProperty(val.id, index)}}>
                                                    <DeleteIcon sx = 
                                                        {{
                                                            color: 'red',
                                                        }}/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) :
                                properties.map((val, index) => {
                                    return (
                                        <TableRow sx={{backgroundColor: 'white'}} key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{val.address}</TableCell>
                                            <TableCell>{val.purchase_price || 'N/A'}</TableCell>
                                            <TableCell>{val.maintenance_costs || 'N/A'}</TableCell>
                                            <TableCell>
                                                <select style={{color: val.status?'#4bcc00':'red'}}
                                                        onChange={(e) => {updatePropertyStatus(e.target.value, val.id)}}
                                                        value={val.status}
                                                >
                                                    <option value={1}>
                                                        Occupied
                                                    </option>
                                                    <option value={0}>
                                                        Vacant
                                                    </option>
                                                </select>
                                            </TableCell>
                                            <TableCell sx={{paddingTop: rowCellStyle.paddingTop,
                                                            paddingBottom: rowCellStyle.paddingBottom}}>
                                                <Link to={`/properties/${val.id}`}>
                                                    <IconButton onClick={() => {}}>
                                                        <VisibilityIcon sx = 
                                                            {{
                                                                color: 'rgb(82, 191, 235)',
                                                            }}/>
                                                    </IconButton>
                                                </Link>
                                                <IconButton onClick={() => {deleteProperty(val.id, index)}}>
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
                        No Properties
                    </Typography>            
                </Box>
            </div>
        </div>  
    )
}