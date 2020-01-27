import React, { useState, useContext } from "react";
import { Card, CardBody, CardFooter } from "../Card";

export function WizardStep({ children }) {
    return children
}

const PreviousButton = props => (
    <button type="button" className="uk-button uk-button-large uk-button-default" {...props}>
        Previous
    </button>
);
const NextButton = props => (
    <button type="button" className="uk-button uk-button-large uk-button-default" {...props}>
        Next
    </button>
);
const SubmitButton = formProps => {
    console.log("SUBMIT PROPS", formProps)
    return(
    <button
        type="submit"
        className="uk-button uk-button-large uk-button-default"
        disabled={formProps.isSubmitting || !formProps.isValid}
        >
        Submit
    </button>
)
};

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
    formProps
}) => (
    <CardFooter>
        <div className="uk-grid-collapse uk-child-width-1-2" data-uk-grid>
            <div>
                {!isFirstStep && <PreviousButton onClick={onClickPrevious} />}
            </div>
            <div className="uk-text-right">
                {!isLastStep && <NextButton onClick={onClickNext} />}
                {isLastStep && <SubmitButton formProps={formProps} onClick={onSubmit} />}
            </div>
        </div>
    </CardFooter>
);

export function Wizard({ header, onSubmit, children, formProps }) {
    console.log("WIZARD PROPS", formProps)
    const [currentStep, setStepIndex] = useState(0);
    const incrementStep = () => setStepIndex(currentStep + 1);
    const decrementStep = () => setStepIndex(currentStep - 1);
    const computedState = getComputedState({
        currentStep,
        numberOfSteps: children.length - 1
    });

    return (
        <div className="wizard-container">
            <Card className="wizard-card">
            <CardBody className="uk-height-1-1">{children[currentStep]}</CardBody>
            <WizardNavigation
                {...computedState}
                formProps={formProps}
                onSubmit={onSubmit}
                onClickNext={incrementStep}
                onClickPrevious={decrementStep}
            />
            </Card>
        </div>
    );
}
