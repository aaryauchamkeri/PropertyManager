import { useContext, useState } from "react";
import styles from "./propertyUpload.module.css"
import { useNavigate } from "react-router-dom";
import {Step, StepLabel, Stepper, Button} from '@mui/material';
import Info from "./Info";
import Files from "./Files";
import { CredInfoCtx } from "../../App";

export default function PropertyUpload(/*{name='', address='', pPrice='', maintenanceCosts}*/) {
    const navigator = useNavigate();
    const credCtx = useContext(CredInfoCtx);
    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState('hello world');
    const [address, setAddress] = useState('hello world');
    const [pPrice, setPPrice] = useState();
    const [maintenanceCosts, setMaintenanceCosts] = useState();
    const [rooms, setRooms] = useState(3);
    const [company, setCompany] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [jPhone, setJPhone] = useState();
    const [jEmail, setJEmail] = useState();
    const [images, setImages] = useState([]);

    function getCurrentComponent() {
        switch(activeStep) {
            case 0:
                return <Info
                            name = {name} setName = {setName}
                            address = {address} setAddress = {setAddress}
                            pPrice = {pPrice} setPPrice = {setPPrice}
                            maintenanceCosts = {maintenanceCosts} setMaintenanceCosts = {setMaintenanceCosts}
                            rooms = {rooms} setRooms = {setRooms}
                            company = {company} setCompany = {setCompany}
                            email = {email} setEmail = {setEmail}
                            phone = {phone} setPhone = {setPhone}
                            jPhone = {jPhone} setJPhone = {setJPhone}
                            jEmail = {jEmail} setJEmail = {setJEmail}
                        />
            case 1: 
                return <Files images={images} setImages={setImages}/>
        }
    }

    async function nextStep() {
        if (activeStep === 0) {
            if(!name || !address) {
                setActiveStep(0);
                return;
            } else {
                setActiveStep(activeStep + 1);
            }
        } else if (activeStep === 1) {
            await sendProperty();
            navigator('/properties');
        } else {
            setActiveStep(activeStep + 1);
        }
    }

    async function sendProperty() {
        try {
            let res = await fetch('https://propertymanager.onrender.com/properties/add', {
                method: "POST",
                headers: {
                    'accountId': credCtx.accountId,
                    'Authorization': `Bearer ${credCtx.userData.auth}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "data": {
                        "name": name,
                        "address": address
                    }
                })
            });

            let propertyId = (await res.json()).id;
            console.log(propertyId);

            const form = new FormData();
            form.append('propertyId', propertyId);
            images.forEach(image => {
                form.append('files', image);
            })

            let imageRes = await fetch('https://propertymanager.onrender.com/properties/addFiles', {
                method: 'POST',
                headers: {
                    'accountId': credCtx.accountId,
                    'Authorization': `Bearer ${credCtx.userData.auth}`
                }, 
                body: form
            });

            console.log(imageRes);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.stepperContainer}>
                <Stepper activeStep={activeStep} sx={{width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Step>
                        <StepLabel>
                            Enter Basic Information
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            Upload Images
                        </StepLabel>
                    </Step>
                </Stepper>
            </div>
            <div style={{width: '100%', height: '88%'}}>
                {
                    getCurrentComponent()
                }
            </div>
            <div className={styles.navContainer}>
                <Button variant='text'
                        disabled={activeStep === 0}
                        onClick = {() => {setActiveStep((prev) => --prev)}}
                >
                    Back
                </Button>
                <Button variant='text'
                        onClick = {nextStep}
                >
                    {activeStep === 2 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    )
}