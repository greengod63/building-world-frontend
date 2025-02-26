import { FC, } from "react";
import './profileButton.scss';
import { profileButtonProps } from '../../../types/profile/profileTypes';

const ProfileButton: FC<profileButtonProps> = ({ onClick, children }) => {
  return (
    <button className="profile-input-button" onClick={onClick}>{children}</button>
  );
};

export default ProfileButton;
