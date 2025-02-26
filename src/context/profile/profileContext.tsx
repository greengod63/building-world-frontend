import { createContext, useState, FC, useEffect } from "react";
import { profile, profileProviderProps } from '../../types/context/profileContextTypes';
import { authorizedRequest } from '../../utils/queries';
import { whoAmIUrl } from '../../utils/network';
export const ProfileContext = createContext<profile>({} as profile);

const ProfileProvider: FC<profileProviderProps> = ({ children }) => {
  const [isAvatarChangeModalOpen, setisAvatarChangeModalOpen] = useState(false)
  const [isCutomizeAvatarModalOpen, setisCutomizeAvatarModalOpen] = useState(false)
  const [avatarFile, setAvatarFile] = useState<null | File>(null)
  const [imgUrl, setImgUrl] = useState('')
  const [userProfileData, setUserProfileData] = useState({
    firstName: 'Ivan',
    lastName: 'Ivan',
    email: 'baby',
    position: 'Lead Team A',
    phoneNumber: '(+98)1234-567-89',
    location: 'e.g New York, USA'
  })
  const [loadingProfileData, setLoadingProfileData] = useState(false)
  useEffect(() => {
    setLoadingProfileData(true)
    authorizedRequest(whoAmIUrl, 'GET').then((data) => {
      const userDataResponse: any = data?.result
      setUserProfileData({
        firstName: userDataResponse.first_name,
        lastName: userDataResponse.last_name,
        email: userDataResponse.email,
        phoneNumber: userDataResponse.phone_number,
        position: 'Lead Team A',
        location: 'e.g New York, USA'
      })
      setLoadingProfileData(false)

    })
  }, [])
  return (
    <ProfileContext.Provider value={{
      isAvatarChangeModalOpen,
      setisAvatarChangeModalOpen,
      isCutomizeAvatarModalOpen,
      setisCutomizeAvatarModalOpen,
      avatarFile,
      setAvatarFile,
      imgUrl,
      setImgUrl,
      loadingProfileData,
      userProfileData,
      setUserProfileData

    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider;
