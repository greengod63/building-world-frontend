import { useState, useContext, FC } from "react";
import "./hireWorker.scss";
import InputField from "../../../components/general/inputField/inputField";
import CheckBox from "../../../components/general/checkBox/checkBox";
import SubmitButton from "../../../components/general/submitButton/submitButton";
import { hireUrl } from '../../../utils/network';
import { authorizedRequest } from '../../../utils/queries';

import Modal from '../../../components/general/modal/modal';
import { ModalsContext } from '../../../context/modalsContext';

const HireWorker: FC = () => {

  // data for tracking if the pop up open and what is the leader's id
  const { hireWorkerModalIsOpen, setHireWorkerModalIsOpen, hireWorkerLeader } = useContext(ModalsContext);

  // close modal funtion
  const closeModal = () => setHireWorkerModalIsOpen(false);

  // pop up intupt's data
  const [position, setPosition] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [wage, setWage] = useState<number | string>('');
  const [workingHours, setWorkingHours] = useState<number | string>('');

  // pop up checkboxes data
  const [employeeCheckbox, setEmployeeCheckbox] = useState<boolean>(false);
  const [projectsCheckbox, setProjectsCheckbox] = useState<boolean>(false);
  const [purchaseCheckbox, setPurchaseCheckbox] = useState<boolean>(false);
  const [salesCheckbox, setSalesCheckbox] = useState<boolean>(false);
  const [stocksCheckbox, setStocksCheckbox] = useState<boolean>(false);
  const [financeCheckbox, setFinanceCheckbox] = useState<boolean>(false);

  // generating and sending the jwt
  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const companyId: number = parseInt(localStorage.getItem('companyId') || '-1');

    const data = {
      email,
      link: 'http://localhost:3000/accept-invitation/register/{TOKEN}',
      employee: {
        work_hour: workingHours,
        wage,
        position,
        leader_id: hireWorkerLeader,
        company_id: companyId
      },
      navbar: {
        employee: employeeCheckbox,
        projects: projectsCheckbox,
        sales: salesCheckbox,
        purchase: purchaseCheckbox,
        finance: financeCheckbox
      }
    };
    
    authorizedRequest(hireUrl, 'POST', 'accessToken', data);
    
  }

  return (
    <Modal
      closeModal={closeModal}
      open={hireWorkerModalIsOpen}
      additionalClass='hire-worker'
    >
      <p className="hire-worker-title">Add new user</p>
      <form className="hire-worker-form" onSubmit={submitHandle}>
        <div className="hire-worker-content-container">
          <div className="hire-worker-content-input-container">
            <InputField  type="text" name="position" value={position} label='Position' onChange={(e) => {
              setPosition(e.target.value);
            }}/>
            <InputField  type="email" name="email" value={email} label='Email' onChange={(e) => {
              setEmail(e.target.value);
            }}/>
            <InputField type="text" name="wage" value={wage} label='Wage' onChange={(e) => {
                setWage(e.target.value.replace(/\D/g,'').length>0 ? parseInt(e.target.value.replace(/\D/g,'')) : '')
              }}/>
            <InputField type="text" name="work-hour" value={workingHours} label='Work hours' onChange={(e) => {
                // removing all letters
                setWorkingHours(e.target.value.replace(/\D/g,'').length>0 ? parseInt(e.target.value.replace(/\D/g,'')) : '');
              }}/>
          </div>
          <div className="hire-worker-functions">
            <p className="hire-worker-functions-title">User Function</p>
            <div className="hire-work-functions-checkbox-container">
              <CheckBox
                setIsChecked={setEmployeeCheckbox}
                label='Employee'
                isChecked={employeeCheckbox}
              />
              <CheckBox
                setIsChecked={setProjectsCheckbox}
                label='Projects'
                isChecked={projectsCheckbox}
              />
              <CheckBox
                setIsChecked={setPurchaseCheckbox}
                label='Purchases'
                isChecked={purchaseCheckbox}
              />
              <CheckBox
                setIsChecked={setSalesCheckbox}
                label='Sales'
                isChecked={salesCheckbox}
              />
              <CheckBox
                setIsChecked={setStocksCheckbox}
                label='Stocks'
                isChecked={stocksCheckbox}
              />
              <CheckBox
                setIsChecked={setFinanceCheckbox}
                label='Finance'
                isChecked={financeCheckbox}
              />
            </div>
          </div>
        </div>
        <div className="hire-worker-submit-container">
          <SubmitButton text="Add" />
        </div>
      </form>
    </Modal>
  );
}

export default HireWorker;
