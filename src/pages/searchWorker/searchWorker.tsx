import './searchWorker.scss';
import SearchUserCard from '../../components/searchWorker/searchUserCard/searchUserCard';
import BaseLayout from "../../layouts/baseLayout/baseLayout";
import InputField from '../../components/general/inputField/inputField'
import PaginationButtons from '../../components/general/paginationButtons/paginationButtons';
import { ChangeEvent, useState, useEffect } from 'react';
import { workerResponse } from '../../types/types';


const SearchWorker = () => {

  const numbers = [1, 2, 3, 4, 5]

  const [workersList, setworkersList] = useState<any[]>([]);
  const [workerName, setworkerName] = useState('');
  const [pageNum, setpageNum] = useState(1);

  const workerFetch = async () => {
    // const workers = await SearchWorkerFetch<workerResponse[]>(workerName, pageNum);
    // setworkersList(workers);
    console.log(workersList)
  }

  const onSerachChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchInputData = event.target.value;

    setworkerName(searchInputData)
  }

  useEffect(() => { setpageNum(1); workerFetch(); }, [workerName]);
  useEffect(() => { workerFetch(); console.log(2) }, [pageNum]);

  // console.log(pageNum);

  return (
    <BaseLayout>
      <div className='search-worker-wrapper'>
        <div className='search-worker-container'>
          <div className="search-worker-input-warpper">
            <InputField type={workerName} onChange={onSerachChange} placeholder='Search' isSearch={true} name='SerachInput' />
          </div>
          <div className='list-of-workers'>

            {
              workersList ? (
                workersList.map((worker) => {
                  const { position, avatar_link, id, user_id, name, } = worker;
                  return (
                    <SearchUserCard position={position} url={avatar_link} name={name} />
                  )
                })
              ) : (
                // <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/>
                <h1>Workers is not exist</h1>
              )
            }
            {/* <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/>
                        <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/>
                        <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/>
                        <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/>
                        <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/>
                        <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/>
                        <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/>
                        <SearchUserCard position={'CEO'} name={'Emery Vetrovs'}/> */}
          </div>
          <div className='pagination-buttons-container'>
            {numbers.map((number) => {
              return (
                <PaginationButtons number={number} setNum={setpageNum} />
              )
            })}


            <div>...</div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default SearchWorker;
