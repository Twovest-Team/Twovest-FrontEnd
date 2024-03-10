import { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";

const PasswordInputComponent = ({passwordValue, handleSetPasswordValue, errorMessage}) => {


 const [showPassword, setShowPassword] = useState(false);


 const handleChange = (e) => {
    handleSetPasswordValue(e.target.value);
    // Validar o sucesso do input sempre que utiliador altera o valor do input
 };

 const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
 };


 return (
    <div>
        <input
          type={showPassword ? "text" : "password"}
          className={`input_text ${errorMessage && "input_text-error"}`} // Se sucesso === true, aplica class de sucesso
          placeholder="Password"
          onChange={e => handleChange(e)}
          value={passwordValue}
        />
        
        <button onClick={handleClickShowPassword}>
          <span className="icon_password">
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </button>
        
        

        {errorMessage && (
          <div>
            {errorMessage}
          </div>
        )}
    </div>
 );
};

export default PasswordInputComponent;
