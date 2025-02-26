import { useState, useEffect, useContext } from "react";
import "./navBar.scss";
import {
  navlogo,
  Logout,
} from "../../../assets/Icons";
import NavBarItem from "./navBarItem/navBarItem";
import { navbarProps } from "../../../types/general/navbarTypes";
import { useNavigate } from "react-router-dom";
import { navbarUrl } from '../../../utils/network';
import { authorizedRequest } from '../../../utils/queries';
import { ModalsContext } from '../../../context/modalsContext';


const NavBar = () => {
  const [navData, setNavData] = useState<Array<navbarProps>>([]);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const { setCompanisListModalIsOpen } = useContext(ModalsContext);
  const navigate = useNavigate();

  const companyAvatar = localStorage.getItem("companyAvatar")
  const companyName = localStorage.getItem("companyName")
  const employeeId = parseInt(localStorage.getItem("employeeId") || '-1')
  

  useEffect(() => {
    if(employeeId > -1){
      authorizedRequest(navbarUrl(employeeId), 'GET').then((data) => {
        if(data && data.ok){
          setNavData(data.result);
        }else{
          navigate('/login');
        }
      })
    }else{
      navigate('/login');
    }
  }, []);
  
  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar-header" onClick={() => setCompanisListModalIsOpen(true)}>
          <span className="navnar-company-avatar-container">{companyAvatar && companyAvatar != 'null' ? <img src={companyAvatar} /> : navlogo}</span>
          <p className="navbar-head-text">{companyName}</p>
        </div>
        <div className="navbar-container">
          {navData.map((item, i) => (
            <NavBarItem
              key={i}
              text={item.name}
              url={item.url}
              menuItems={item.subitems}
              index={i + 1}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </div>
      </div>
      <div className="navbar-bottom" onClick={()=>{
        localStorage.setItem("avatar", '')
        localStorage.setItem("userId", '')
        localStorage.setItem("companyId", '')
        localStorage.setItem("employeeId", '')
        localStorage.setItem("companyAvatar", '')
        localStorage.setItem("companyName", '')
        navigate('/login');
      }}>
        <div className="logout-button">
          <span>{Logout}</span>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
