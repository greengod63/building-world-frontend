import './formError.scss';
import { FC } from 'react';
import { formErrorProps } from '../../../types/general/generalTypes';
import { errorAlert } from '../../../assets/Icons'; 

const FormError: FC<formErrorProps> = ({ errorText, appear }) => {
    return (
      <>
      {appear ? (
        <div className="error-container">
          {errorAlert}
          <p>{errorText}</p>
        </div>
      ) : null}
      </>
    )
}

export default FormError