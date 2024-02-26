import {Typography, TextField} from '@mui/material';
import styles from './Info.module.css';

export default function TextFieldLabel({label, onChangeHandler, required, value}) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', 
                    margin: '0.5em', gap: '0.5em', alignItems: 'center',
                    justifyContent: 'space-between'}}>
            <Typography variant='h6'>{label + ": "}</Typography>
            <TextField defaultValue={value}
                       onChange={onChangeHandler} size='small' label={label}
            ></TextField>
        </div>
    )
}