import {useEffect, useState, useContext, FC} from "react";
import InputField from '../../../components/general/inputField/inputField';
import GeneralWorkerCard from '../../../components/general/generalWorkerCard/generalWorkerCard';
import { ModalsContext } from '../../../context/modalsContext';
import './moveWorker.scss';
import { hierarchyItem } from '../../../types/hierarchy/generalTypes'; 
import Modal from '../../../components/general/modal/modal';
import { authorizedRequest } from '../../../utils/queries';
import { moveWorkerUrl } from '../../../utils/network';

const MoveWorker: FC = () => {
  const { moveWorkerIsOpen, setMoveWorkerIsOpen, moveWorkerData, setMoveWorkerData, setMoveWorkerConfirmationIsOpen } = useContext(ModalsContext);

  const [ searchRequest, setSearchRequest ] = useState('');
  const [ newLeaders, setNewLeaders ] = useState<hierarchyItem[]>([]);

  const companyId = parseInt(localStorage.getItem('companyId') || '-1');

  const closeModal = () => {
    setMoveWorkerIsOpen(false);
    setSearchRequest('');
    setMoveWorkerData({employeeId: -1, newLeaderId: -1, team: false});
  }

  const workerCardClickHandler = (newLeaderId: number) => { 
    setMoveWorkerIsOpen(false);
    setMoveWorkerConfirmationIsOpen(true);
    setMoveWorkerData({employeeId: moveWorkerData.employeeId, newLeaderId: newLeaderId, team: moveWorkerData.team});
  }

  useEffect(() => {
    if(moveWorkerIsOpen){
      authorizedRequest(moveWorkerUrl(companyId, moveWorkerData.employeeId), 'PUT', 'accessToken', {search_request: searchRequest}).then((responce) => {
        setNewLeaders([...responce.result]);
      })
    }
  }, [moveWorkerIsOpen])

  useEffect(() => {
    if(moveWorkerIsOpen){
      authorizedRequest(moveWorkerUrl(companyId, moveWorkerData.employeeId), 'PUT', 'accessToken', {search_request: searchRequest}).then((responce) => {
        setNewLeaders([...responce.result]);
      })
    }
  }, [searchRequest])

//   console.log(workersForMove);
  return (
    <Modal 
      closeModal={closeModal}
      open={moveWorkerIsOpen}
      additionalClass='move-worker'
    >
      <div className="move-worker-container">
        <div className="move-worker-search-container">
          <InputField
            placeholder="Search"
            name="search"
            type="text"
            value={searchRequest}
            onChange={(e) => setSearchRequest(e.target.value)}
            isSearch={true}
          />
        </div>
        <div className="move-worker-new-leaders-list">
          {newLeaders.map(({name, position, avatar_link, employee_id, user_id}) => 
              <GeneralWorkerCard
                  name={name}
                  position={position}
                  avatar={avatar_link}
                  userId={user_id}
                  onClickHandler={() => workerCardClickHandler(employee_id)}
                  key={`move-worker-card-${user_id}`}
              />
          )}
        </div>
        
      </div>
    </Modal>
  );
}
export default MoveWorker;