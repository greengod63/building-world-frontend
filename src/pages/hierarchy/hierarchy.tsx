
import { FC, useState, useEffect, useContext, useRef } from "react";
import "./hierarchy.scss";
import HierarchyUserCard from "../../components/hierarchy/hierarchyUserCard/hierarchyUserCard";
import BaseLayout from "../../layouts/baseLayout/baseLayout";
import { hierarchyItem } from '../../types/hierarchy/generalTypes';
import { hireEmployeeButton } from '../../assets/hierarchyIcons';
import { authorizedRequest } from '../../utils/queries'
import { fetchOwnersUrl, fetchEmployeesUrl, fetchLeadersUrl, fetchTheLeaderUrl } from "../../utils/network";
import { ModalsContext } from "../../context/modalsContext";
import HireWorker from '../../modals/hierarchy/hireWorker/hireWorker';
import FireWorker from '../../modals/hierarchy/fireWorker/fireWorker';
import MoveWorker from '../../modals/hierarchy/moveWorker/moveWorker';
import MoveWorkerConfirmation from '../../modals/hierarchy/moveWorker/moveWorkerConfirmation/moveWorkerConfirmation';


const Hierachy: FC = () => {

  //global variables
  const companyId: number = parseInt(localStorage.getItem('companyId') || '-1'); // id of chosen company
  const employeeId: number = parseInt(localStorage.getItem('employeeId') || '-1'); // employee id of the user in the chosen company

  const { setHireWorkerModalIsOpen, setHireWorkerLeader } = useContext(ModalsContext); // setHireWorkerModalIsOpen - updating status of the pop up, setHireWorkerLeader - leader employee id for an employee who will be invited

  const horizontalContainerRef = useRef<null | HTMLDivElement>(null); // horizontal scrolling element

  const [hierarchy, setHierarchy] = useState<hierarchyItem[][]>([]); // hierarchy array
  const [hierarchyLevel, setHierarchyLevel] = useState<number>(1); // hierarchy level of the logged in user
  const [isActive, setIsActive] = useState<boolean>(true); // saying if the logged in user was ever clicked in the hierarchy tree

  // initial hierarchy structure generation
  useEffect(() => {
    authorizedRequest(fetchTheLeaderUrl(companyId, employeeId), 'GET').then((data) => { // checking if there is a leader for the user
      console.log(data)
      if (data.result) { // if it's not an owner
        // getting the list of the leader and his peers
        authorizedRequest(fetchLeadersUrl(companyId, employeeId), 'GET').then((LeadersData) => {
          // highliting the leader amoung his peers
          for (let i = 0; i < LeadersData.result.length; i++) {
            if (LeadersData.result[i].employee_id === data.result.employee_id) {
              LeadersData.result[i].active = true;
            }
          }

          // getting peers of the logged in user
          authorizedRequest(fetchEmployeesUrl(companyId, data.result.employee_id), 'GET').then((peersData) => {
            // highlighting the logged in user amoung his peers
            for (let i = 0; i < peersData.result.length; i++) {
              if (peersData.result[i].employee_id === employeeId) {
                peersData.result[i].active = true;
              }
            }

            // getting employees of the logged in user
            authorizedRequest(fetchEmployeesUrl(companyId, employeeId), 'GET').then((employeesData) => {

              // rendering the initial hierarchy
              setHierarchy([[...LeadersData.result], [...peersData.result], [...employeesData.result]]);
              setIsActive(true);
              setHierarchyLevel(1);

              // scrolling the horizontal container to the end
              if (horizontalContainerRef.current) {
                horizontalContainerRef.current.scrollLeft = horizontalContainerRef.current.scrollWidth - horizontalContainerRef.current.clientWidth
              }
            })
          })
        })
      } else { // if it's an owner

        // getting list of the owners(the user's peers)
        authorizedRequest(fetchOwnersUrl(companyId), 'GET').then((ownersData) => {
          // highlighting the logged in user amoung his peers
          for (let i = 0; i < ownersData.result.length; i++) {
            if (ownersData.result[i].employee_id === employeeId) {
              ownersData.result[i].active = true;
            }
          }

          // getting employees of the logged in user
          authorizedRequest(fetchEmployeesUrl(companyId, employeeId), 'GET').then((employeesData) => {

            // rendering the initial hierarchy
            setHierarchy([[...ownersData.result], [...employeesData.result]]);
            setIsActive(true);
            setHierarchyLevel(0);

            // scrolling the horizontal container to the end
            if (horizontalContainerRef.current) {
              horizontalContainerRef.current.scrollLeft = horizontalContainerRef.current.scrollWidth - horizontalContainerRef.current.clientWidth
            }
          })
        })
      }
    })

  }, [])

  // loading deeper structure if the user requested it by scrolling to the beginning
  const scrollHandler = () => {
    // if the user scrolled to the beginning
    if (horizontalContainerRef.current && horizontalContainerRef.current.scrollLeft <= 50) {
      const notDirectLeader = hierarchy[0].filter((employee) => employee.active); // the most remoted leader of the user
      if (notDirectLeader.length >= 1) {
        // getting leader of the not direct leader
        authorizedRequest(fetchLeadersUrl(companyId, notDirectLeader[0].employee_id), 'GET').then((LeadersData) => {
          if (LeadersData.result.length >= 1) {
            // getting the direct leader of the not direct leader
            authorizedRequest(fetchTheLeaderUrl(companyId, notDirectLeader[0].employee_id), 'GET').then((directLeaderData) => {
              if (directLeaderData.result) {
                // highliting new the most remoted leader of the user amoung his peers
                for (let i = 0; i < LeadersData.result.length; i++) {
                  if (LeadersData.result[i].employee_id === directLeaderData.result.employee_id) {
                    LeadersData.result[i].active = true;
                  }
                }
              }

              // updating hierarchy data
              setHierarchyLevel(hierarchyLevel + 1);
              setHierarchy([[...LeadersData.result], ...hierarchy]);
            })
          }
        })
      }

    }
  }

  return (
    <BaseLayout>
      <div className="hierarchy">
        <div className="hierarchy-horizontal-container" ref={horizontalContainerRef} onScroll={scrollHandler}>
          {hierarchy.map((employeesList, index) => {
            return (
              <div className="hierarchy-vertical-container" key={`hierarchy-level-${index}`}>
                {
                  employeesList.map((employee, employeeIndex) => {
                    return <HierarchyUserCard
                      employee={employee}
                      setHierarchy={setHierarchy}
                      hierarchy={hierarchy}
                      currentLevel={index}
                      index={employeeIndex}
                      inTeam={index > hierarchyLevel && isActive}
                      setHierarchyLevel={setHierarchyLevel}
                      hierarchyLevel={hierarchyLevel}
                      setIsActive={setIsActive}
                      isActive={isActive}
                      key={`hierarchy-employee-${employee.employee_id}`}
                    />
                  })
                }
                {
                  // showing the hire button in case if the user surfing through his employees(level is lower and he was chosen in the hierarchy structure)
                  index > hierarchyLevel && isActive ?
                    <div className="hierarchy-hire-worker-button" onClick={() => {
                      setHireWorkerModalIsOpen(true);
                      setHireWorkerLeader(hierarchy[index - 1].filter((worker) => worker.active)[0].employee_id)
                    }}>{hireEmployeeButton
                      }
                    </div>
                    :
                    <></>
                }
              </div>
            )
          }
          )}
        </div>
      </div>

      <HireWorker />
      <FireWorker />
      <MoveWorker />
      <MoveWorkerConfirmation />

    </BaseLayout >
  );
};

export default Hierachy;
