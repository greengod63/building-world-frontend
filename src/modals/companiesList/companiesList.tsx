import './companiesList.scss';
import { useContext, useEffect, useState } from 'react';

import Modal from '../../components/general/modal/modal';
import { ModalsContext } from '../../context/modalsContext';

import { createCompany } from '../../assets/companiesListIcons';
import { authorizedRequest } from '../../utils/queries';
import { whoAmIUrl } from '../../utils/network';
import { navlogo } from '../../assets/Icons';
import { companiesList } from '../../types/company/companiesList';

const CompaniesList = () => {
    const { companisListModalIsOpen, setCompanisListModalIsOpen, setCreateCompanyIsOpen } = useContext(ModalsContext);
    const [ comapniesList, setComapniesList ] = useState<companiesList[]>([]);

    const closeModal = () => setCompanisListModalIsOpen(false);
    
    useEffect(() => {
        authorizedRequest(whoAmIUrl, 'GET').then((whoAmIResponce) => {
            console.log(whoAmIResponce)
            if(whoAmIResponce?.ok){
                setComapniesList([...whoAmIResponce.result.companies]);
            }
        })
    }, [])

    return(
        <Modal
            closeModal={closeModal}
            open={companisListModalIsOpen}
            additionalClass='copanies-list'
        >
          <p className="copanies-list-title">Your companies</p>
          <div className="copanies-list-container">
            {comapniesList.map((company: companiesList) =>{
                return (
                    <div className="company-card" key={`company-card-${company.company_id}`} onClick={() => {
                        localStorage.setItem("companyId", `${company.company_id}`);
                        localStorage.setItem("employeeId", `${company.employee_id}`);
                        localStorage.setItem("companyAvatar", `${company.avatar}`);
                        localStorage.setItem("companyName", `${company.name}`);
                        closeModal();
                    }}>
                        <span className="company-avatar">{company.avatar && company.avatar != 'null' ? <img src={company.avatar} /> : navlogo}</span>
                        <div className="company-data">
                            <p className="company-name">{company.name}</p>
                            <p className="company-description">Data Analyst</p>
                        </div>
                    </div>
                )
            })}
            <div className="add-company-button-container" onClick={() => {
                closeModal();
                setCreateCompanyIsOpen(true)
            }}>
                {createCompany}
            </div>
          </div>
        </Modal>
    )
    
}

export default CompaniesList;