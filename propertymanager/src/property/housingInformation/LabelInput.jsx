import styles from "./house.module.css";
import {TextField, Typography} from "@mui/material";

export default function LabelInput({name, placeholder, id, gCol, gRow}) {
    return (
        <div className={styles.labelinputcontainer} style={{gridColumn: gCol, gridRow: gRow}}>
            <label htmlFor={id}>
                <Typography variant="subtitle1">
                    {name}:
                </Typography>
            </label>
            <TextField id={id} placeholder={placeholder} size="small" sx={{backgroundColor: 'white'}}></TextField>
        </div>
    )
}