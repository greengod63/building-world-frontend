import Router from './router';

import { updateStatusUrl, refreshUrl } from './utils/network';
import { authorizedRequest } from './utils/queries';

function App() {

  setInterval(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if(accessToken){
      authorizedRequest(updateStatusUrl, 'PUT')
    }

    if(refreshToken){
      authorizedRequest(refreshUrl, 'GET', 'refreshToken').then((data) => {
        localStorage.setItem("accessToken", data.result.access_token);
      })
    }
  }, 5000)

  return (
    <>
      <Router/>
    </>
  );
}

export default App;
