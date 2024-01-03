import {Typography, TextField} from '@mui/material';
import styles from './basicinfo.module.css';

export default function TextFieldLabel({label, onChangeHandler, required}) {
    return (
        <div className={styles.main}>
            <Typography variant='h6'>{label + ": "}</Typography>
            <TextField placeholder={label} onChange={onChangeHandler}></TextField>
        </div>
    )
}