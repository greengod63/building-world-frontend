import { whoAmIUrl, updateStatusUrl } from "../utils/network";
import { whoAmIType } from '../types/general/generalTypes';

// export const whoAmI =  async () => {
  
//   const token = localStorage.getItem("token");

//   const response = await fetch(whoAmIUrl, {
//       method: 'GET',
//       headers: { 
//         'Authorization': `Bearer ${token}`
//       }
//     });

//   return await response.json();
// }

export const updateStatus = async () => {
  const token = localStorage.getItem("token");
  if(token){
    const responce = await fetch(updateStatusUrl, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    }).catch((err) => {
      return undefined
    })

    if(responce){
      return await responce.json();
    }else{
      return undefined;
    }

  }else{
    return undefined
  }

}