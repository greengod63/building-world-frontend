import "./navBarItem.scss";
import {
  employee,
  project,
  sale,
  purchase,
  finance,
  hierarchy,
  searchWorker,
  chat,
  pipeline,
  tasks,
  statistic,
  providers,
  order,
  stockLists,
  planningShipments,
  account,
  flowAndFund,
  mutual,
  vector
} from "../../../../assets/Icons";
import { Link } from "react-router-dom";
import { NavItemProps } from "../../../../types/general/navbarTypes";

const navIcons = [
    {
        icon: employee, 
        subitemIcons:[
            hierarchy,
            searchWorker,
            chat
        ]
    }, 
    {
        icon: project,
        subitemIcons:[
            pipeline,
            tasks,
            statistic
        ]
    },
    {
        icon: purchase,
        subitemIcons:[
            providers,
            order,
            statistic
        ]
    },
    {
        icon: sale,
        subitemIcons:[
            stockLists,
            planningShipments,
            statistic
        ]
    },
    {
        icon: finance,
        subitemIcons:[
            account,
            flowAndFund,
            mutual,
            statistic
        ]
    }
];

function NavBarItem({ text, url, menuItems, index, activeCategory, setActiveCategory}: NavItemProps) {

  const onClickCallback = (index: number) => {
    if(activeCategory == index){
      setActiveCategory(0);
    }else{
      setActiveCategory(index); 
    }
  }
  
  return (
    <div onClick={() => onClickCallback(index)} className={activeCategory === index ? `navitem active`: `navitem`} style={{minHeight: activeCategory === index ? `${menuItems.length*4.3 + 5.2}vw` : `5.2vw`, maxHeight: activeCategory === index ? `${menuItems.length*4.3 + 5.2}vw` : `5.2vw`}}>
      <div className="navitem-header">
        <div className="navitem-header-text">
          <span className="navitem-header-icons">{navIcons[(index)-1].icon}</span>
          <p>{text}</p>
        </div>
        <span className={activeCategory == index ? "navitem-header-vector rotated" : "navitem-header-vector"}>{vector}</span>
        {/* <FiChevronRight className={activeCategory == index ? "rotate" : "rotate rotated"} /> */}
      </div>
      <div className={activeCategory == index ? "navitem-item-container" : 'navitem-item-container hidden'} >
        {menuItems.map((item, i) => (
          <Link
            className="navbar-link"
            onClick={(e) => {
              setActiveCategory(0);
            }}
            to={item.url!}
            key={i}
          >
            {navIcons[(index!)-1].subitemIcons[i]}
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBarItem;
