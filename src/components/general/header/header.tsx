import { basicUserAvatar } from '../../../assets/chatIcons';
import './header.scss'
import { Link } from "react-router-dom";

const Header = () => {
  const avatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("id");

  return (
    <div className='header-container'>
      <Link className="navbar-link" to={`/profile/`}>
        {
          avatar && avatar != 'null' ? <img className='img' src={avatar} alt="" /> : basicUserAvatar
        }

        </Link>
      </div>
    )
}

export default Header
