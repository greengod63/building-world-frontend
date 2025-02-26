import { FC, FormEvent, useContext, useEffect, useState } from 'react'
import './browseAvatarModal.scss';
import { ProfileContext } from '../../../context/profile/profileContext';
import InputField from '../../../components/general/inputField/inputField';
import Modal from '../../../components/general/modal/modal';
import { browseFile } from '../../../assets/profileIcons';


const BrowseAvatarModal: FC = () => {
  const { isAvatarChangeModalOpen, setisAvatarChangeModalOpen, setisCutomizeAvatarModalOpen, imgUrl, setAvatarFile, setImgUrl } = useContext(ProfileContext);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (imgUrl.length) {
      setisAvatarChangeModalOpen(false);
      setisCutomizeAvatarModalOpen(true)
    }
  }, [imgUrl])

  const handleDragEnter = (event: React.FormEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: FormEvent) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: FormEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false)

    const file = event.dataTransfer.files[0];
    setAvatarFile(file)
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result;
      setImgUrl(`${imageUrl}`);
    };

    reader.readAsDataURL(file);
  };

  const handleBrowseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImgUrl(URL.createObjectURL(file as File))
  }

  const closeModal = () => setisAvatarChangeModalOpen(false);
  return (
    <Modal
      closeModal={closeModal}
      open={isAvatarChangeModalOpen}
      additionalClass='browse-avatar'>
      <div className='browse-avatar-container'>

        {
          !imgUrl.length ?
            <div className={`drop-zone drop-image  ${dragging ? 'dragging' : ''}`}

              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="drop-image-icon">
                {browseFile}

              </div>
              <div className="drop-image-text">
                Drop images here
              </div>
            </div> :
            <img className='dropped-img' src={imgUrl as string} alt="" />
        }
        <div className="or">Or</div>
        <div className="browse-file-input">
          <label htmlFor="file" className='browse-input' >
            Browse file
          </label>
          <InputField type="file" id="file" hidden name="" onChange={(e) => handleBrowseFile(e)} />
        </div>
      </div>
    </Modal>
  )
}

export default BrowseAvatarModal;
