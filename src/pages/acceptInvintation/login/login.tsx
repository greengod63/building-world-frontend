import { useState } from "react";
import { whoAmIUrl, loginUrl, acceptJobOfferUrl } from "../../../utils/network";
import { unauthorizedRequest, authorizedRequest } from "../../../utils/queries";


import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { eye, eyeoff } from "../../../assets/Icons";
import CheckBox from "../../../components/general/checkBox/checkBox";
import Field from "../../../components/general/inputField/inputField";
import Heading from "../../../components/general/title/title";
import SubmitButton from "../../../components/general/submitButton/submitButton";
import FormError from "../../../components/general/formError/formError";

import "./login.scss";
import { buttonType } from "../../../types/general/generalTypes";

const AcceptInvitationLogin = () => {

  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { token } = useParams();

  const navigate = useNavigate();
  // login method
  const onSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    unauthorizedRequest(loginUrl, 'POST', { email, password }).then((responce) => {
      console.log(responce)
      if (responce.ok) {
        setError(false);

        new Promise<void>((resolveOuter) => {
          localStorage.setItem("accessToken", responce.result.access_token)
          localStorage.setItem('refreshToken', responce.result.refresh_token)
          resolveOuter()
        }).then(() => {
          authorizedRequest(acceptJobOfferUrl, 'POST', 'accessToken', { 'token': token }).then((acceptInvitationResponce) => {
            if (acceptInvitationResponce.ok) {
              authorizedRequest(whoAmIUrl, 'GET').then((whoAmIResponce: any) => {
                console.log(whoAmIResponce)
                localStorage.setItem("avatar", whoAmIResponce.result.avatar)
                localStorage.setItem("userId", whoAmIResponce.result.user_id)
                localStorage.setItem("companyId", whoAmIResponce.result.companies[0].company_id)
                localStorage.setItem("employeeId", whoAmIResponce.result.companies[0].employee_id)
                localStorage.setItem("companyAvatar", whoAmIResponce.result.companies[0].avatar)
                localStorage.setItem("companyName", whoAmIResponce.result.companies[0].name)
                navigate('/');
              })
            } else if (acceptInvitationResponce === 400) {
              console.log('ddssf')
              setError(true);
              setErrorText('No such invitation token');
            } else if (acceptInvitationResponce === 401) {
              setError(true);
              setErrorText('Token expired or already used');
            } else if (acceptInvitationResponce === 402) {
              setError(true);
              setErrorText('This is not for current user');
            }
          })
        })
      } else if (responce === 400 || responce === 401) {
        setError(true);
        setErrorText("Wrong email or password");
      }
    })
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <Heading text="Sign In" />
          <div className="login-text">
            <p>Don’t have an account yet?</p>
            <Link to={`/accept-invitation/register/${token}`}>
              <p>Register</p>
            </Link>
          </div>
        </div>
        <FormError errorText={errorText} appear={error} />
        <form onSubmit={onSumit} className="login-form">
          <div className="form-controls">
            <Field
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              name="email"
            />
            <div className="password-control">
              <Field
                type={isVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                name="password"
              />
              <span
                title={isVisible ? "hide password" : "show password"}
                className="input-icon"
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              >
                {isVisible ? eye : eyeoff}
              </span>
            </div>
          </div>
          <div className="login-options">
            <CheckBox
              isChecked={rememberMe}
              setIsChecked={setRememberMe}
              label="Remember me"
            />
            <Link to="/forget" className="login-forget">
              Forget password?
            </Link>
          </div>
          <SubmitButton type={buttonType.submit} text="Sign In" />
        </form>
      </div>
    </div>
  );
};


export default AcceptInvitationLogin;