"use client";

import PasswordInputComponent from "@/components/inputs/PasswordInputComponent";
import { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from "@mui/icons-material/Error";

export default function TestagemInputs() {
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSetPasswordValue(value) {
    setPasswordValue(value);
    //console.log(value);
  }

  const handleSubmit = (e) => {
    //console.log("Ola");

    e.preventDefault();

    const passwordRules = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRules.test(passwordValue)) {
      setErrorMessage(
        "Password should have at least 8 characters, 1 uppercase letter, 1 number and 1 special character."
      );
    } else {
      setErrorMessage("");
     //console.log("Password is:", passwordValue);
    }
  };
  return (

    <form onSubmit={(e) => handleSubmit(e)}>

        <div className="div_input-text">
        <input type="text" className="input_text" placeholder="Text" />
        </div>
      
      <div className="div_input-text-done">
            <input type="text" className="input_text-done" placeholder="Text" />
                    <div>
                        <span className="icon_done">
                        <DoneIcon />
                        </span>
                    </div>
        </div>
      

        <div className="div_input-text-error">
            <input type="text" className="input_text-error" placeholder="Text" />
            <div>
                <span className="icon_error">
                <ErrorIcon />
                </span>
            </div>
            
        </div>
      
        <div className="div_input-text-password">
            <div>
                <span className="icon_visibility">
                    <PasswordInputComponent
                        passwordValue={passwordValue}
                        handleSetPasswordValue={handleSetPasswordValue}
                        errorMessage={errorMessage}
                    />
                </span>
            </div>
            
        </div>
      
      <button type="submit">Registo</button>
    </form>
  );
}
