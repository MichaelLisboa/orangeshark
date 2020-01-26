import React, { useState } from "react";
// import { Button } from "./Button";
import { Card, CardHeader, CardBody, CardFooter } from "../Card";

const WizardContainer = ({children}) =>
    <div className="wizard-container">{children}</div>

export function WizardStep({ children }) {
    return (
        <WizardContainer>
            {children}
        </WizardContainer>
    );
}

const PreviousButton = props => (
    <button className="uk-button uk-button-large uk-button-default" {...props}>
        Previous
    </button>
);
const NextButton = props => (
    <button className="uk-button uk-button-large uk-button-primary" {...props}>
        Next
    </button>
);
const SubmitButton = props => (
    <button className="uk-button uk-button-large uk-button-primary" {...props}>
        Submit
    </button>
);

function getComputedState({ currentStep, numberOfSteps }) {
    return {
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === numberOfSteps
    };
}

const WizardNavigation = ({
    isFirstStep,
    isLastStep,
    onClickNext,
    onClickPrevious,
    onSubmit,
    onCancel
}) => (
    <CardFooter>
        <div className="uk-grid-collapse uk-child-width-1-2" data-uk-grid>
            <div>
                {!isFirstStep && <PreviousButton onClick={onClickPrevious} />}
            </div>
            <div className="uk-text-right">
                {!isLastStep && <NextButton onClick={onClickNext} />}
                {isLastStep && <SubmitButton onClick={onSubmit} />}
            </div>
        </div>
    </CardFooter>
);

export function Wizard({ header, onSubmit, onCancel, children }) {
    const [currentStep, setStepIndex] = useState(0);
    const incrementStep = () => setStepIndex(currentStep + 1);
    const decrementStep = () => setStepIndex(currentStep - 1);
    const computedState = getComputedState({
        currentStep,
        numberOfSteps: children.length - 1
    });

    return (
        <Card>
        <CardBody>{children[currentStep]}</CardBody>
        <WizardNavigation
            {...computedState}
            onSubmit={onSubmit}
            onCancel={onCancel}
            onClickNext={incrementStep}
            onClickPrevious={decrementStep}
        />
        </Card>
    );
}
