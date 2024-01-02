import styles from './properties.module.css';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {Tab, Tabs, Button,
    TextField, TableContainer, Table, TableHead, TableCell,
    TableBody, TableRow} from '@mui/material'
import {Outlet} from 'react-router-dom'
import { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';

const cellStyle = {
    paddingTop: '0.7em',
    paddingBottom: '0.7em'
}

export default function Properties() {
    const [tab, setTab] = useState(0);
    const location = useLocation();
    const navigator = useNavigate();

    // check children paths
    if(location.pathname.endsWith('/createProperty')) {
        return (
            <>
                <Outlet/>
            </>
        )
    }

    function handleAddPropertyClick(e) {
        navigator('/properties/createProperty');
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
                    <Table style={{tableLayout: 'fixed'}}>
                        <TableHead sx={{backgroundColor: 'rgb(247, 247, 247)',
                                        color: 'white'}}>
                            <TableCell key={1} sx={{paddingTop: cellStyle.paddingTop,
                                                    paddingBottom: cellStyle.paddingBottom}}>
                                <Typography variant='subtitle1'>No</Typography>    
                            </TableCell>
                            <TableCell key={2} sx={{paddingTop: cellStyle.paddingTop,
                                                    paddingBottom: cellStyle.paddingBottom}}>
                                <Typography variant='subtitle1'>Address</Typography>
                            </TableCell>
                            <TableCell key={3} sx={{paddingTop: cellStyle.paddingTop,
                                                    paddingBottom: cellStyle.paddingBottom}}>
                                <Typography variant='subtitle1'>Purchase Price</Typography>
                            </TableCell>
                            <TableCell key={4} sx={{paddingTop: cellStyle.paddingTop,
                                                    paddingBottom: cellStyle.paddingBottom}}>
                                <Typography variant='subtitle1'>Tenants</Typography>
                            </TableCell>
                            <TableCell key={5} sx={{paddingTop: cellStyle.paddingTop,
                                                    paddingBottom: cellStyle.paddingBottom}}>
                                <Typography variant='subtitle1'>Status</Typography>
                            </TableCell>
                            <TableCell key={6} sx={{paddingTop: cellStyle.paddingTop,
                                                    paddingBottom: cellStyle.paddingBottom}}>
                                <Typography variant='subtitle1'>Actions</Typography>
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{backgroundColor: 'white'}}>
                                <TableCell key={1}>
                                    <Typography variant='subtitle1'>1</Typography>
                                </TableCell>
                                <TableCell key={1}>
                                    <Typography variant='subtitle1' sx={{overflowX: 'auto'}}>
                                        20687 Park Circle West
                                    </Typography>
                                </TableCell>
                                <TableCell key={1}>
                                    <Typography variant='subtitle1'>
                                        $895,000
                                    </Typography>
                                </TableCell>
                                <TableCell key={1}>
                                    <Typography variant='subtitle1'>
                                        3
                                    </Typography>
                                </TableCell>
                                <TableCell key={1}>
                                    <Typography variant='subtitle1'>
                                        <span className={styles.occupiedLabelStyle}>
                                            Occupied
                                        </span>
                                    </Typography>
                                </TableCell>
                                <TableCell key={1}>
                                    <IconButton>
                                        <VisibilityIcon sx = 
                                            {{
                                                color: 'blue',
                                            }}/>
                                    </IconButton>
                                    <IconButton>
                                        <ModeEditIcon sx = 
                                            {{
                                                color: 'green',
                                            }}/>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon sx = 
                                            {{
                                                color: 'red',
                                            }}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={1}
                    rowsPerPage={10}
                    page={1}
                    onPageChange={() => {}}
                    onRowsPerPageChange={() => {}}
                />
            </div>
        </div>  
    )
}