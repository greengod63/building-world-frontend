import { searchWorkersUrl } from '../utils/network';
import { workerResponse } from '../types/searchWorkersTypes';

export const searchWorkers = async (needle: string) => {
  const token = localStorage.getItem('token');
  let page_num = 1;
  let results_per_page=10;
  const data = {
    needle,
    results_per_page,
    page_num
  }
  const response = await fetch(searchWorkersUrl,{
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(data)
  })

  const workers: workerResponse = await response.json()
  return workers
}