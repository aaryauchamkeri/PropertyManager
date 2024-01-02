import {MobileStepper, Button} from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';
import { useState } from 'react';


export default function ImageTabs() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <MobileStepper
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        sx={{width: '100%', height: '10%', display: 'flex'}}
        nextButton={
            <Button size="small" onClick={() => {}}>
            Next
            <KeyboardArrowRight />
            </Button>
        }
        backButton={
            <Button size="small" onClick={() => {}}>
            <KeyboardArrowLeft />
            Back
            </Button>
        }
        />        
    )
}