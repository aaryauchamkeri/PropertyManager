import { useState } from "react";
import styles from "./propertyUpload.module.css"
import { useTranslation } from "react-i18next";
import {Step, StepLabel, Stepper, Button} from '@mui/material';
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
                            <Button sx={{color: 'black'}}>First</Button>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Button sx={{color: 'black'}}>Second</Button>
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <Button sx={{color: 'black'}}>Third</Button>
                        </StepLabel>
                    </Step>
                </Stepper>
            </div>
            <div className={styles.content}>
                {/* <EnterUnits/> */}
            </div>
            <div className={styles.nav}>

            </div>
        </div>
    );
}