
import "./register.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { registerDataTypes } from '../../../types/register/registerTypes';
import { useState } from "react";
import { unauthorizedRequest } from '../../../utils/queries';
import { registerUrl } from '../../../utils/network';

import { buttonType } from "../../../types/general/generalTypes";
import Heading from "../../../components/general/title/title";
import Field from "../../../components/general/inputField/inputField";
import Submitbutton from "../../../components/general/submitButton/submitButton";
import { eye, eyeoff } from "../../../assets/Icons";
import FormError from "../../../components/general/formError/formError";

const AcceptInvitationRegister = () => {
  const {token} = useParams();
  console.log(token)

  const [registerData, setRegisterData] = useState<registerDataTypes>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerData)

    if(registerData.password.length >= 6 && /[a-zA-Z]/g.test(registerData.password) && /[0-9]/g.test(registerData.password)){
      
      const registerResponse = unauthorizedRequest(registerUrl, 'POST', {first_name: registerData.firstName, last_name: registerData.lastName,  email: registerData.email,  password: registerData.password, phone_number: registerData.phoneNumber});
      registerResponse.then((responce) => {
        console.log('registerResponse: ', responce);
        if (responce === 409) {
          setError(true);
          setErrorText("This email is already use by another account.");
        }else if (registerData.password !== registerData.confirmPassword) {
          setError(true);
          setErrorText("Passwords do not match.");
        }else{
          new Promise<void>((resolveOuter) => {
            setError(false);
            localStorage.setItem("verificationToken", responce.result.token);
            resolveOuter();
          }).then(()=>{
            navigate(`/accept-invitation/confirmation/${registerData.email}/${token}`);
          })
        }
      })
    }else{
      setError(true);
      setErrorText("The password has to be at least 6 characters length and has to include number and letters.");
    }
  }


  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setRegisterData({
      ...registerData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handlePhoneNumberChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setRegisterData({
      ...registerData,
      [e.currentTarget.name]: e.currentTarget.value.toLowerCase().replace(/[a-z]/g,'')
    })
  }

  return (
    <div className="registration">
      <form onSubmit={handleSubmit} className="registration-form"> 
      <div className="registration-wrraper">

        <div className="registration-header-container">
          <div className="registration-header">
            <Heading text="Create an account" />
          </div>
          <h4 className="registration-header">
            Have an account? <Link to={`/accept-invitation/login/${token}`}>Sign in</Link>
          </h4>
        </div>

        <FormError errorText={errorText} appear={error} />
          
          <div className="registration-info">
            <div className="fields-container">
              <Field
                name='firstName'
                placeholder="First name"
                value={registerData.firstName}
                onChange={handleChange}
                type="text" />
              <Field
                name='lastName'
                placeholder="Last name"
                value={registerData.lastName}
                onChange={handleChange}
                type="text" />
              <Field
                name='email'
                placeholder="Email"
                value={registerData.email}
                onChange={handleChange}
                type="email" />
              <div className="field-container">
                <Field
                  name='password'
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  minLength={6}
                  value={registerData.password}
                  onChange={handleChange}
                />
                <span
                  title={passwordVisible ? "hide password" : "show password"}
                  className="input-icon"
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                >
                  {passwordVisible ? eye : eyeoff}
                </span>
              </div>

              <Field
                name='confirmPassword'
                minLength={6}
                type={passwordVisible ? "text" : "password"}
                placeholder="Repeat password"
                value={registerData.confirmPassword}
                onChange={handleChange}
              />


              <Field
                name='phoneNumber'
                placeholder="Phone number"
                value={registerData.phoneNumber}
                onChange={handlePhoneNumberChange}
                type="tel" />

            </div>
            <Submitbutton type={buttonType.submit} text="Create" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AcceptInvitationRegister;
