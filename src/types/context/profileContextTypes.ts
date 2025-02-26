import { Dispatch, SetStateAction } from 'react'
import { actionType } from '../chats/actionsType'
import { contextMenuType } from './chatContextTypes'

type profileData = {
  firstName: string,
  lastName: string,
  email: string,
  position: string,
  phoneNumber: string,
  location: string
}

export type profile = {
  isAvatarChangeModalOpen: boolean,
  setisAvatarChangeModalOpen: Dispatch<SetStateAction<boolean>>,
  isCutomizeAvatarModalOpen: boolean,
  setisCutomizeAvatarModalOpen: Dispatch<SetStateAction<boolean>>,
  avatarFile: File | null,
  setAvatarFile: Dispatch<SetStateAction<File | null>>,
  imgUrl: string
  setImgUrl: Dispatch<SetStateAction<string>>,
  loadingProfileData: boolean,
  userProfileData: profileData,
  setUserProfileData: Dispatch<SetStateAction<profileData>>
}

export type profileProviderProps = {
  children: React.ReactNode
}
