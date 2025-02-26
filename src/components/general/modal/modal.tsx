import { FC, useEffect, useState } from "react";
import { close } from "../../../assets/Icons";
import { modalProps } from "../../../types/general/generalTypes";
import './modal.scss';



const Modal: FC<modalProps> = ({ closeModal, closeButton=true, open, additionalClass, children }) => {

  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if(open){
      setInitiated(true)
    }
  }, [open])

  return (
    <>
    {initiated ? 
      <div onClick={closeModal} className={open ? 'dark-bg' : 'hiddenss'}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`modal-container ${additionalClass}`}
        >
          {closeButton && (
            <div className="modal-header">
                <span onClick={() => closeModal()} className="close-animate">{close}</span>
            </div>
          )}
          {children}
        </div>
      </div> : null
    }
    </>
  );
};

export default Modal;
