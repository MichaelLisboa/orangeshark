import React, { useState } from "react"
import "react-dates/initialize"
import { DateRangePicker, DayPickerRangeController } from "react-dates"
import moment from "moment";

export const InlineDatePickerWithFormik = ({
  startDateId,
  endDateId,
  form: { setFieldValue, setFieldTouched, values },
  field,
  ...props
}) => {
  const [startDate, setStartDate] = useState(null);
  const [, setEndDate] = useState(null);
  // const handleDatesChange = ({ startDate, endDate }) => {
  //   // setStartDate(startDate);
  //   // setEndDate(endDate);
  //   setFieldValue("startDate", startDate);
  //   setFieldValue("endDate", endDate);
  // };

  const handleDateChange = ({startDate, endDate}) => {
      console.log("DATE CHANGE PROPS", startDate)
      setStartDate(startDate);
      setEndDate(endDate);
      console.log(startDate)
  }

  console.log(startDate)
  const [focusedInput, setFocusedInput] = useState(null);
  return (
    <DayPickerRangeController
        startDate={setStartDate(moment(Date.now()))}
        endDate={moment(Date.now())}
        onDatesChange={({ startDate, endDate }) => handleDateChange({startDate, endDate})}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        initialVisibleMonth={() => moment().add(2, "M")}
        noBorder
        daySize={40}
        numberOfMonths={1}
    />
  )
}


export const ModalDatePickerWithFormik = ({
  startDateId,
  endDateId,
  form: { setFieldValue, setFieldTouched, values },
  field,
  ...props
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  return (
    <DateRangePicker
        startDate={values.startDate}
        startDateId="start_date"
        endDate={values.endDate}
        endDateId="end_date"
        onDatesChange={({ startDate, endDate }) => {
            setFieldValue("startDate", startDate)
            setFieldValue("endDate", endDate)
        }}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        noBorder
        required
        daySize={40}
        numberOfMonths={1}
        withFullScreenPortal
    />
  )
}
