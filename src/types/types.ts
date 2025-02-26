import { moveWorker } from './../assets/Icons';
import React from "react"

export type ErrorProps = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  code?: any;
};

export type codeProps = {
  code: any;
};

export type EmailProps = {
  email: any;
};

export type textFieldProps = {
  isSearchInput?: boolean;
  name: string;
  placeholder: string;
};

export type workerModalProps = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type moveWorkerType = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  leaderId: number;
}

export type workerCardProps = {
  workerNames: string;
  workerPosition: string;
  workerAvatar?: string;
  id: number
  leaderId: number
}

export type moveWorker = {
  leader_id: number;
  team_moving: boolean;
}

export type WorkersSettings = {
  id: number,
  user_id: number,
  position: string,
  name: string,
  avatar_link: string
}

// export type workerResponse = {
//   ok: boolean;
//   description: string;
//   result: [
//     WorkersSettings
//   ];
// }
// export type workerFetch = {
//   ok: boolean,
//   description: string,
//   result: [
//     {
//     id: number,
//     user_id: number,
//     position: string,
//     name: string,
//     avatar_link: string
//   }
// ]
// }
export type workersTypes = {
  id: number;
  user_id: number;
  position: string;
  name: string;
  avatar_link: string;
}

export type workerResponse = {
  ok: boolean;
  description: string;
  result: workersTypes[];
};

export type whoAMiResponse = {
  description: string
  ok: boolean
  result: {
    avatar: null | string,
    companies: {
      avatar: null | string,
      company_id: number
      employee_id: number
      name: string
      name_in_law: string
      owner_id: number
      position: string
    }[]
    confirmed_on: number
    email: string
    external_id: string
    first_name: string
    is_active: boolean
    is_admin: boolean
    is_online: boolean
    last_name: null | string
    phone_number: string
    registered_on: number
    role: string
    user_id: number
  }
}
