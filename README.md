# @geekagency/(p)react-forms


## install

    yarn add @geekagency/react-forms


  or

    yarn add @geekagency/preact-forms

## usage

    import useForm from '../../hooks/useForm';

    const initialValues = {
      name:"",
      email:"",
      message:""
    };


    const handleValidation =  (field,value,values)=> {
      if (field === 'email'){
        if (isEmptyString(value))
          return `Il manque votre adresse e-mail`
        if (!isEmail(value))
          return `Essayez quelque chose comme "votre@adresse.com"`;
      }

      if(isEmptyString(value)){
        return `Ce champs doit être rempli`
      }

      return true
    }

    //form will submit
    const handleFormSubmit = (values,validation)=>{
        postContactForm(fields)
    }

    const {fields,validator,handleInput,formValid,formTouched,handleSubmit,handleEvents} = useForm(initialValues,handleFormSubmit,handleValidation,'name')
