import styles from './tenantUpload.module.css';
import {Typography} from '@mui/material';
import TextFieldLabel from '../../property/propertyUpload/TextFieldLabel.jsx';
import {Button} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload.js';

export default function TenantUpload() {
    return (
        <div className={styles.main}>
            <div className={styles.tenantInformation}>
                <div className={styles.uploadCard}>
                    <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                    >
                        Upload Profile Picture
                        <input type='file' style={{display: 'none'}}/>
                    </Button>
                    <TextFieldLabel label={'First Name'} value={''}/>
                    <TextFieldLabel label={'Last Name'} value={''}/>
                    <TextFieldLabel label={'Email'} value={''}/>
                    <TextFieldLabel label={'Phone'} value={''}/>
                    <TextFieldLabel label={'Start'} value={''}/>
                    <TextFieldLabel label={'End'} value={''}/>
                    <TextFieldLabel label={'Property'} value={''}/>
                    <TextFieldLabel label={'Rent'} value={''}/>
                    <TextFieldLabel label={'Currency Type'} value={''}/>
                    <div style={{width: '100%'}}>

                    </div>
                </div>
            </div>
            <div className={styles.footerNavigation}>
                <Button sx={{fontSize: '1em'}}>Back</Button>
                <Button sx={{fontSize: '1em'}}>Finish</Button>
            </div>
        </div>  
    )
}