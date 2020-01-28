import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardFooter } from "../Card";

export function WizardStep({ children }) {
    return children
}

const PreviousButton = props => {
    return (
        <button type="button" className="uk-button uk-button-large uk-button-default" {...props}>
            Previous
        </button>
    )
};
const NextButton = props => {
    return (
        <button type="button" className="uk-button uk-button-large uk-button-default" {...props}>
            Next
        </button>
    )
};

const SubmitButton = ({formProps}) => {
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
        currentStep: currentStep,
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
    formProps,
    disabled
}) => (
    <CardFooter>
        <div className="uk-grid-collapse uk-child-width-1-2" data-uk-grid>
            <div>
                {!isFirstStep && <PreviousButton onClick={onClickPrevious} />}
            </div>
            <div className="uk-text-right">
                {!isLastStep && <NextButton disabled={disabled} onClick={onClickNext} />}
                {isLastStep && <SubmitButton formProps={formProps} onClick={onSubmit} />}
            </div>
        </div>
    </CardFooter>
);

export function Wizard({ header, onSubmit, children, formProps, ...props }) {
    const [currentStep, setStepIndex] = useState(0);
    const [disabled, setDisabled] = useState(true)
    const incrementStep = () => setStepIndex(currentStep + 1);
    const decrementStep = () => setStepIndex(currentStep - 1);
    const computedState = getComputedState({
        currentStep,
        numberOfSteps: children.length - 1
    });

    useEffect(
        () => {
            props.adNetwork === "" || props.mediaType === "" ? setDisabled(true) : setDisabled(false);
        }, [props.adNetwork, props.mediaType]
    )

    return (
        <div className="wizard-container">
            <Card className="wizard-card">
                <CardBody className="uk-height-1-1">
                    {children[currentStep]}
                </CardBody>
                <WizardNavigation
                    {...computedState}
                    disabled={disabled}
                    formProps={formProps}
                    onSubmit={onSubmit}
                    onClickNext={incrementStep}
                    onClickPrevious={decrementStep}
                />
            </Card>
        </div>
    );
}
