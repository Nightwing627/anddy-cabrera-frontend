import React, { useState, useEffect} from "react";

import ConfirmPasswordInputField from "./ConfirmPasswordInputField";
import PasswordInputField from "./PasswordInputField";



function PasswordAndConfirmPasswordValidation({SetPassword}){
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordInput, setPasswordInput]= useState({
        password:'',
        confirmPassword:''
    })
    const handlePasswordChange =(evnt)=>{
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
        const NewPasswordInput = {...passwordInput,[passwordInputFieldName]:passwordInputValue}
        setPasswordInput(NewPasswordInput);        
        
    }
    const handleValidation= (evnt)=>{
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
            //for password 
    if(passwordInputFieldName==='password'){
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp   = /.{8,}/;
        const passwordLength =      passwordInputValue.length;
        const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
        const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
        const digitsPassword =      digitsRegExp.test(passwordInputValue);
        const specialCharPassword = specialCharRegExp.test(passwordInputValue);
        const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
        let errMsg ="";
        if(passwordLength===0){
                errMsg="";
        }else if(!uppercasePassword){
                errMsg="At least one Uppercase";
        }else if(!lowercasePassword){
                errMsg="At least one Lowercase";
        }else if(!digitsPassword){
                errMsg="At least one digit";
        }else if(!specialCharPassword){
                errMsg="At least one Special Characters";
        }else if(!minLengthPassword){
                errMsg="At least minumum 8 characters";
        }else{
            errMsg="";
        }
        setPasswordErr(errMsg);
        }
        // for confirm password
        if(passwordInputFieldName=== "confirmPassword" || (passwordInputFieldName==="password" && passwordInput.confirmPassword.length>0) ){
                
            if(passwordInput.confirmPassword!==passwordInput.password)
            {
            setConfirmPasswordError("Confirm password is not matched");
            }else{
            setConfirmPasswordError("");
            }
            
        }
    }
    useEffect(() => {
        SetPassword(passwordInput.password)
      }, [passwordInput.password]);
        return(
        <>
            <PasswordInputField 
            handlePasswordChange={handlePasswordChange} 
            handleValidation={handleValidation} 
            passwordValue={passwordInput.password} 
            passwordError={passwordError}/>
            <ConfirmPasswordInputField 
            handlePasswordChange={handlePasswordChange} 
            handleValidation={handleValidation} 
            confirmPasswordValue={passwordInput.confirmPassword} 
            confirmPasswordError={confirmPasswordError}/>
        </>
        )
    }
    export default PasswordAndConfirmPasswordValidation;