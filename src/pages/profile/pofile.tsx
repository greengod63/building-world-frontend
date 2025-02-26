import { useContext, useEffect, useState } from 'react';
import './profile.scss';
import BaseLayout from '../../layouts/baseLayout/baseLayout';
import { ProfileContext } from '../../context/profile/profileContext';
import ProfileInput from '../../components/profile/profileInput/profileInput';
import BrowseAvatarModal from '../../modals/profile/browseAvatarModal/BrowseAvatarModal';
import CutomizeAvatarModal from '../../modals/profile/cutomizeAvatarModal/cutomizeAvatarModal';
import { whitePencilFill } from '../../assets/profileIcons';
import { whoAmIUrl } from '../../utils/network';
import { authorizedRequest } from '../../utils/queries';


const Profile = () => {
  const { setisAvatarChangeModalOpen, isAvatarChangeModalOpen, isCutomizeAvatarModalOpen, loadingProfileData, userProfileData } = useContext(ProfileContext);

  const userAvatar = localStorage.getItem('avatar')
  return (
    <BaseLayout>
      {!loadingProfileData &&
        <>
          <div className="profile-wrapper">
            <div className="profile-container">
              <div className="profile-url-container">
                <div>
                  <img src={`${userAvatar}`} alt="" className="profile-url" />
                  <button onClick={() => { setisAvatarChangeModalOpen(true) }}>{whitePencilFill}</button>
                </div>
                <p className="name"></p>
                <p className="position"></p>
              </div>
              <div className="profile-user-data">
                <span className='profile-user-data-firstLastName'>{`${userProfileData.firstName} ${userProfileData.lastName}`}</span>
                <span className='profile-user-data-position'>{userProfileData.position}</span>
              </div>

              <div className="profile-inputs-container">
                <ProfileInput inputName='First Name' value={userProfileData.firstName} keyName='first_name' type='text' />
                <ProfileInput inputName='Email' value={userProfileData.email} keyName='email' type='email' />
                <ProfileInput inputName='Position' value={userProfileData.position} keyName='position' type='text' />
                <ProfileInput inputName='Last Name' value={userProfileData.lastName} keyName='last_name' type='text' />
                <ProfileInput inputName='Phone Number' value={userProfileData.phoneNumber} keyName='phone_number' type='text' />
                <ProfileInput inputName='Location' value={userProfileData.location} keyName='location' type='text' />
              </div>
            </div>
          </div>
          {isAvatarChangeModalOpen && <BrowseAvatarModal />}
          {isCutomizeAvatarModalOpen && <CutomizeAvatarModal />}
        </>}
    </BaseLayout>
  );
};

export default Profile;
