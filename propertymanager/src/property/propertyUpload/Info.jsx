import styles from './Info.module.css';
import {Typography} from '@mui/material';
import TextFieldLabel from './TextFieldLabel';

export default function Info(props) {
    return (
        <div className={styles.main}>
            <div className={styles.houseInfo}>
                <div className={styles.label} style={{backgroundColor: 'red'}}>
                    <Typography variant='subtitle1' sx={{color: 'white'}}>
                        House Information
                    </Typography>
                </div>
                <TextFieldLabel label='Name' 
                    value = {props.name}
                    onChangeHandler={(e) => {props.setName(e.target.value)}}/>
                <TextFieldLabel label='Address' 
                    value={props.address}
                    onChangeHandler={(e) => {props.setAddress(e.target.value)}}/>
                <TextFieldLabel label='Purchase Price' 
                    value = {props.pPrice}
                    onChangeHandler={(e) => {props.setPPrice(e.target.value)}}/>
                <TextFieldLabel label='Maintenance Costs'
                    value = {props.maintenanceCosts}
                    onChangeHandler={(e) => {props.setMaintenanceCosts(e.target.value)}}/>
                <TextFieldLabel label='Rooms' 
                    value = {props.rooms}
                    onChangeHandler={(e) => {props.setRooms(e.target.value)}}/>
                <div className={styles.label} style={{backgroundColor: '#c1d602'}}>
                    <Typography variant='subtitle1' sx={{color: 'white'}}>
                        Housing Company Information
                    </Typography>
                </div>
                <TextFieldLabel label='Housing Company' 
                    value = {props.company}
                    onChangeHandler={(e) => {props.setCompany(e.target.value)}}/>
                <TextFieldLabel label='Housing Company Email'
                    value = {props.email}
                    onChangeHandler={(e) => {props.setEmail(e.target.value)}}/>
                <TextFieldLabel label='Housing Company Phone' 
                    value = {props.phone}
                    onChangeHandler={(e) => {props.setPhone(e.target.value)}}/>
                <TextFieldLabel label='Janitor Phone' 
                    value = {props.jPhone}
                    onChangeHandler={(e) => {props.setJPhone(e.target.value)}}/>
                <TextFieldLabel label='Janitor Email' 
                    value = {props.jEmail}
                    onChangeHandler={(e) => {props.setJEmail(e.target.value)}}/>
            </div>
        </div>
    )
}