import React from "react";
import {
  TextField,
  Icon,
  Button,
  StepLabel,
  Step,
  Stepper
} from "@material-ui/core";

function getSteps() {
  return ["First Name", "Last Name", "Address"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <TextField label="First Name"></TextField>;
    case 1:
      return <TextField label="Last Name"></TextField>;
    case 2:
      return <TextField label="Address"></TextField>;
    default:
      return "";
  }
}

export default function HorizontalStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <div className="flex flex-middle mb-16">
              <Icon>done</Icon> <span className="ml-8">Done</span>
            </div>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div className="pt-24">
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                className="ml-16"
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
