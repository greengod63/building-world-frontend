import { Link, useParams, useNavigate } from 'react-router-dom'
import './confirmation.scss'
import { useState } from 'react'
import { buttonType } from '../../../types/general/generalTypes'
import Heading from '../../../components/general/title/title'
import Submitbutton from '../../../components/general/submitButton/submitButton'
import InputField from '../../../components/general/inputField/inputField'
import { errorAlert } from "../../../assets/Icons";

import { unauthorizedRequest } from '../../../utils/queries';
import { VerifyRegUrl } from '../../../utils/network';


const AcceptInvitationConfirmation = () => {
  const { email, token } = useParams();
  const [ error, setError ] = useState(false);
  const [ code, setCode ] = useState<string | number>('');
  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(code){
      const confirm = unauthorizedRequest(VerifyRegUrl, 'POST', {token: localStorage.getItem("verificationToken"), code: code})

      confirm.then((responce) => {
        if (!responce.ok) {
            setError(true);
        } else {
            setError(false);
            navigate(`/accept-invitation/login/${token}`);
        }
      }) 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.replace(/\D/g,'').length>0 ? parseInt(e.target.value.replace(/\D/g,'')) : '')

  };

  return (
    <div className="verification">
      <form
        onSubmit={handleSubmit}
        className="verification-form">
        <div>
          <div className='form-header'>
            <Heading text="Verify Your Email Address" />
            <p>
              Do you want to go back? <Link to="/register">Return</Link>
            </p>
          </div>

          <div className="error-container">
            {error ? (
              <>
                {errorAlert}
                <p>Wrong verification code</p>
              </>
            ) : null}
          </div>
          <div className='form-email-info'>
            <p>We sent a confirmation code to </p>
            <p className='email'>{email}</p>
          </div>
        </div>
        <div className="form-control">
          <InputField
            name="code"
            type="text"
            value={code}
            onChange={(e) => handleChange(e)}
            placeholder="Enter code"
          />
        </div>
        <Submitbutton type={buttonType.submit} text='Send' />
      </form>
    </div>
  )
}

export default AcceptInvitationConfirmation
