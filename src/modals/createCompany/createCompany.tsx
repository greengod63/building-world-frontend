import './createCompany.scss';
import { useContext, useState } from 'react';

import Modal from '../../components/general/modal/modal';
import { ModalsContext } from '../../context/modalsContext';
import InputField from "../../components/general/inputField/inputField";
import SubmitButton from "../../components/general/submitButton/submitButton";

const CreateCompany = () => {
    const [ companyName, setCompanyName ] = useState('');
    const [ companyLegalName, setCompanyLegalName ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ email, setEmail ] = useState('');

    const { createCompanyIsOpen, setCreateCompanyIsOpen } = useContext(ModalsContext);
    const closeModal = () => setCreateCompanyIsOpen(false);

    return(
        <Modal
            closeModal={closeModal}
            open={createCompanyIsOpen}
            additionalClass='create-company'
        >
            <p className="create-company-title">Create a company</p>
            <form
                onSubmit={(e) => {
                }}
                className="create-company-form"
            >

                <div className="create-company-container">
                    <div className="create-company-input-container">
                        <label htmlFor="companyName">Company Name</label>
                        <InputField
                            type="text"
                            name="companyName"
                            value={companyName} 
                            onChange={(e) => {
                                setCompanyName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="create-company-input-container">
                        <label htmlFor="companyLegalName">Company Legal Name</label>
                        <InputField
                            type="text"
                            name="companyLegalName"
                            value={companyLegalName} 
                            onChange={(e) => {
                                setCompanyLegalName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="create-company-input-container">
                        <label htmlFor="phoneNumber">Company Phone Number</label>
                        <InputField
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber} 
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                    </div>
                    <div className="create-company-input-container">
                        <label htmlFor="email">Company Email</label>
                        <InputField
                            type="text"
                            name="email"
                            value={email} 
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="create-company-submit-container">
                    <SubmitButton text="Create" />
                </div>
            </form>
        </Modal>
    )
}

export default CreateCompany;