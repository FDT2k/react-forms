import { useState,useEffect } from "./react-deps";


import useFieldValues from './useFieldValues'
import useFieldValidator from './useFieldValidator'

export default (initialState,submitFn,validateFn,prop='id') => {

  const [debug,setDebug] = useState(false)
  const [formTouched,setFormTouched] = useState(false)
  const {values: fields, handleChange : handleFieldChange} = useFieldValues(initialState,prop);

  const {formValid,validationStatus,handleValidation,setTouched,setDebug:setValidatorDebug} = useFieldValidator(initialState,validateFn)


/*
  const [validator, setValidation] = useState({});
  const [formValid,setFormValid] = useState(false);
  const [formTouched,setFormTouched] = useState(false);

  const handleValidation = (state,forceTouched=false) => {

    let validationState ={}
    let isFormValid = true;
    Object.keys(state).map( field => {
      const value = state[field];
      const initialValue = initialState[field];
      let touched = typeof (validator[field]) ==='undefined' ? false: validator[field].touched;

      let valid = validateFn ? validateFn(field,value) : true;

      if( !touched && state[field] !== initialState[field]){
        touched = true
      }

      if(forceTouched){
        touched=true
      }
      validationState[field] = {valid,touched}
      isFormValid = isFormValid && valid
    })
    setFormValid(isFormValid)
    setValidation(validationState)
    return validationState;
  }

*/


  const handleSubmit = (event)=> {
      setFormTouched(true)
      debug && console.log('[SUBMIT_ATTEMPT]',formValid,fields,validationStatus)
      if(formValid){
        debug && console.log('[FORM IS VALID -> SUBMITTING]',fields)

        submitFn(fields,validationStatus);
      }else{
        handleValidation(fields,true);
      }
      event.preventDefault();
  }

  const handleEvent = (event) => {
    const fieldKey = event.target[prop]
    debug && console.log('[FORM_EVENT]',event.type, event.target[prop])
    if( event.type === 'input'){
      let newState = handleFieldChange(event);
  //    handleValidation(newState)
    }

    if(event.type ==='blur'){
      setTouched(fieldKey,true)

      handleValidation(fields)
    }
    if(event.type === 'focus'){
    }
  }

  useEffect(()=>{
    setValidatorDebug(debug)

    handleValidation(fields)
  },[])

  return {
    fields,
    setDebug,
    validator:validationStatus,
    handleSubmit,
    handleInput:handleEvent,
    handleEvents: {onChange:handleEvent,onBlur:handleEvent,onFocus:handleEvent}
  };
}
