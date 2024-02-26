import styles from './properties.module.css';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Button, TextField} from '@mui/material';
import {Outlet} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { CredInfoCtx } from '../App';
import {TableContainer, Table, TableHead, TableRow, TableCell, TablePagination,
        TableBody} from '@mui/material';
import {Link} from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';

// styles for cells
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
    const location = useLocation();
    const navigator = useNavigate();
    const [properties, setProperties] = useState([]);
    const [tenants, setTenants] = useState([[]]);

    // for retrieving data about the properties and tenants
    useEffect(() => {
        (async () => {
            try {

                // properties
                let propertiesResponse = await fetch('http://localhost:3000/properties/list', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${infoContext.userData.auth}`,
                        'accountId': 1
                    }
                });
                propertiesResponse = await propertiesResponse.json();
                setProperties(propertiesResponse);

                // tenants
                let updatedTenants = [];
                propertiesResponse.forEach(async (val, ind) => {
                    let propertyId = val.id;
                    let propertyTenants = await fetch(`http://localhost:3000/properties/tenants?propertyId=${propertyId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${infoContext.userData.auth}`,
                            'accountId': 1
                        }
                    });
                    let propertyTenantsJson = await propertyTenants.json();
                    updatedTenants[ind] = propertyTenantsJson;
                    setTenants(updatedTenants);
                });
            } catch (err) {
                console.log(err);
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
        let res = await fetch(`http://localhost:3000/properties/delete/${propertyId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${infoContext.userData.auth}`,
                'accountId': 1
            },
            body: JSON.stringify({'propertyId': propertyId})
        });
        console.log(res);
    } 

    return (
        <div className={styles.main}>
            <Typography variant='h6' sx={{marginBottom: '0.5em'}}>Properties</Typography>
            <div className={styles.tableContainer}>
                <div className={styles.utilityContainer}>
                    <TextField id="outlined-basic" label="Search" size="small" fullWidth
                        variant="outlined" sx = {{backgroundColor: 'white', marginRight: '1em'}} />
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
                                                    Tenants
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
                                properties.map((val, index) => {
                                    return (
                                        <TableRow sx={{backgroundColor: 
                                                index%2 == 0 ? 'white': 'rgb(245, 245, 245)'}}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{val.address}</TableCell>
                                            <TableCell>{val.purchase_price || 'N/A'}</TableCell>
                                            <TableCell>{val.maintenance_costs || 'N/A'}</TableCell>
                                            <TableCell>{tenants[index] ? tenants[index].length : 0}</TableCell>
                                            <TableCell>{tenants[index]?.length > 0 ? 
                                                <span className="occupiedLabelStyle">Occupied</span> : 
                                                <span className="vacantLabelStyle">Vacant</span>
                                            }
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
                                            <IconButton onClick={() => {}}>
                                                <ModeEditIcon sx = 
                                                    {{
                                                        color: 'rgb(82, 235, 130)',
                                                    }}/>
                                            </IconButton>
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
            </div>
        </div>  
    )
}