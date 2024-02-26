import styles from './tenants.module.css';
import {Autocomplete, Button, TextField, Typography} from '@mui/material';

const tenants = [
    {label: 'test', id: 1},
    {label: 'test', id: 2},
    {label: 'test', id: 3},
    {label: 'test', id: 4}
];

export default function Tenants() {

    return (
        <div className={styles.main}>
            <div className={styles.searchContainer}>
                <Autocomplete
                    id='tenantAc'
                    disablePortal
                    options={tenants}
                    fullWidth={true}
                    noOptionsText={'No Tenants Found'}
                    renderInput={(params) => <TextField
                                                {...params} 
                                                label = "Tenant"/>}
                    renderOption={(props, option) => (
                        <Typography {...props} sx={{width: document.getElementById('tenantAc').offsetWidth, 
                                                    padding: '0 0.5em 0 0.5em'}}>
                            {option.label}
                        </Typography>
                    )}              
                /> 
                <Button variant="contained" sx={{whiteSpace: 'nowrap'}}>Add Tenant</Button>
            </div>
            <div className={styles.tenantDisplay}>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
                <div>hello brinnas</div>
            </div>
        </div>
    )
}