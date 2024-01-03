import { useState } from "react";
import styles from "./propertyUpload.module.css"
import { useTranslation } from "react-i18next";
import {Step, StepLabel, Stepper, Button} from '@mui/material';
import BasicInfo from "./propertyUploadStages/BasicInfo";
// import EnterUnits from "./propertyUploadStagePages/EnterUnits";

export default function PropertyUpload() {
    const [currentStep, setCurrentStep] = useState(0);
    const {i18n, t} = useTranslation();
    return (
        <div className={styles.main + " " + styles.mainUpload}>
            <div className={styles.stepperContainer}>
                <Stepper activeStep={1}>
                    <Step>
                        <StepLabel>
                            <Button sx={{color: 'black'}}>Basic Information</Button>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Button sx={{color: 'black'}}>Images</Button>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Button sx={{color: 'black'}}>Tenants</Button>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Button sx={{color: 'black'}}>Contracts</Button>
                        </StepLabel>
                    </Step>
                </Stepper>
            </div>
            <div className={styles.content}>
                <BasicInfo/>
            </div>
            <div className={styles.nav}>
                <Button disabled>Back</Button>
                <Button>Next</Button>
            </div>
        </div>
    );
}