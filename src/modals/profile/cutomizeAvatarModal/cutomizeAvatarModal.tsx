import React, { FC, useContext, useEffect, useRef, useState } from "react"
import './cutomizeAvatarModal.scss';
import Modal from '../../../components/general/modal/modal';
import SubmitButton from '../../../components/general/submitButton/submitButton';
import { buttonType } from '../../../types/general/generalTypes';
import { ProfileContext } from '../../../context/profile/profileContext';
import InputField from '../../../components/general/inputField/inputField';
import { editProfileUrl } from '../../../utils/network';
import { authorizedRequest } from '../../../utils/queries';


const CutomizeAvatarModal: FC = () => {
  const { setisCutomizeAvatarModalOpen, isCutomizeAvatarModalOpen, setImgUrl, imgUrl } = useContext(ProfileContext)
  const closeModal = () => setisCutomizeAvatarModalOpen(false);

  const cancelButtonHandler = () => {
    setisCutomizeAvatarModalOpen(false);
    setImgUrl('')
  }

  const uploadedImageReference = useRef<HTMLImageElement>(null);
  const roundAreaReference = useRef<HTMLDivElement | null>(null)
  const containerReference = useRef<HTMLDivElement | null>(null)

  const [zoomLevel, setZoomLevel] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null); // HERE CROPPED IMAGE
  const [isDragable, setIsDragable] = useState(false)
  const [originalSize, setOriginalSize] = useState<null | { width: number, height: number }>(null)
  const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 })
  const [imageStart, setImageStart] = useState({ x: 0, y: 0 })
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const drag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (originalSize) {
      if (isDragable && containerReference.current && uploadedImageReference.current) {
        const containerRect = containerReference.current.getBoundingClientRect();
        const imageRect = uploadedImageReference.current.getBoundingClientRect();
        const newX = (imageStart.x + (e.clientX - mouseStart.x) / zoomLevel);
        const newY = (imageStart.y + (e.clientY - mouseStart.y) / zoomLevel);

        if (newX > 0) {
          setCoords({ x: 0, y: newY });
        } else if (newX + imageRect.width < containerRect.width) {
          setCoords({ x: containerRect.width - imageRect.width, y: newY });
        } else if (newY > 0) {
          setCoords({ x: newX, y: 0 });
        } else if (newY + imageRect.height < containerRect.height) {
          setCoords({ x: newX, y: containerRect.height - imageRect.height });
        } else {
          setCoords({ x: newX, y: newY });
        }
      }
    }
  };



  const onDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (uploadedImageReference.current) {
      setIsDragable(true)
      setMouseStart({ x: e.clientX, y: e.clientY })
      setImageStart({ x: uploadedImageReference.current?.offsetLeft, y: uploadedImageReference.current?.offsetTop })
    }
  }

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseFloat(e.target.value));
  };



  const cropImage = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = uploadedImageReference.current!;

    if (roundAreaReference.current) {
      const { x, y, width, height } = roundAreaReference.current.getBoundingClientRect()
      const imagex = uploadedImageReference.current!.getBoundingClientRect().x
      const imagey = uploadedImageReference.current!.getBoundingClientRect().y
      canvas.width = width / zoomLevel
      canvas.height = height / zoomLevel
      ctx?.drawImage(image,
        (Math.abs(imagex - x)) / zoomLevel,
        (Math.abs(imagey - y)) / zoomLevel,
        width / zoomLevel,
        height / zoomLevel,
        0, 0,
        canvas.width,
        canvas.height)
      setCroppedImage(canvas.toDataURL())
      await authorizedRequest(editProfileUrl, 'PUT', 'accessToken', {
        "key": "avatar",
        "value": canvas.toDataURL()
      })
      localStorage.setItem('avatar', canvas.toDataURL())
      closeModal()
    }
  };

  useEffect(() => {
    if (!originalSize || originalSize.width === 0) {
      const img = new Image()
      img.src = imgUrl
      setOriginalSize({ width: img.naturalWidth, height: img.naturalHeight })
    }
  }, [imgUrl, originalSize])


  return (
    <Modal
      closeModal={() => { closeModal() }}
      open={isCutomizeAvatarModalOpen}
      additionalClass={`customize-avatar ${originalSize && originalSize.width > originalSize.height - 100 ? '' : 'customize-avatar-rectangle'} `}
    >
      <div className="selected-image-container">
        <div className="update-profile-pic">
          Update Profile Picture
        </div>


        {!originalSize || originalSize.width === 0 ? null : <div
          className='image-cropper-container'
          style={{
            width: `${originalSize.width > originalSize.height - 100
              ? '26.041666666666668vw'
              : '21.041667vw'}`,
            height: `${originalSize.width > originalSize.height - 100
              ? '13.020833333333334vw'
              : '28.020833vw'}`
          }}
          ref={containerReference}
          onMouseDown={(e) => {
            onDragStart(e)
          }}
          onMouseUp={() => setIsDragable(false)}
          onMouseMove={(e) => { drag(e) }}
          onMouseLeave={() => setIsDragable(false)}
        >
          <img crossOrigin="anonymous" src={imgUrl}
            alt="img"
            ref={uploadedImageReference}
            style={{
              width: `${originalSize?.width}`,
              height: `${originalSize?.height}`,
              position: 'absolute',
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              transform: `scale(${zoomLevel})`,
            }}

          />
          <div
            ref={roundAreaReference}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              height: `13.020833333333334vw`,
              maxHeight: `${Math.min(uploadedImageReference.current?.width as number, uploadedImageReference.current?.height as number)}px`,
              maxWidth: `${Math.min(uploadedImageReference.current?.width as number, uploadedImageReference.current?.height as number)}px`,
              aspectRatio: '1/1',
              zIndex: 1,
            }}
          />
          <div className='cropper-blur'></div>

        </div>}

        <div className="cropper-section">
          <div className="input-container">
            <div className="minus" onClick={() => setZoomLevel(zoomLevel - 1 < 1 ? zoomLevel : zoomLevel - 1)}>-</div>
            <InputField name='input-range' className='avatar-input-range' type="range" min="0.5" max="4" step="0.01" value={zoomLevel} onChange={handleZoomChange} />
            <div className="plus" onClick={() => setZoomLevel(zoomLevel + 1 > 4 ? zoomLevel : zoomLevel + 1)}>+</div>
          </div>
        </div>
        <div className="buttons-container">
          <SubmitButton type={buttonType.button} text='Cancel' onClick={cancelButtonHandler} />
          <SubmitButton type={buttonType.submit} text='Apply' onClick={cropImage} />
        </div>
      </div>
    </Modal>
  )
}

export default CutomizeAvatarModal
