import { FC } from 'react';
import { audioWaveProps } from '../../../types/chats/audioMessageType';
import './audioLevel.scss'

const AudioLevel: FC<audioWaveProps> = ({ height }) => {
  // Define the minimum and maximum heights for the level-item div.
  const minHeight = 5;
  const maxHeight = 30;

  // Convert the given height in pixels to viewport units (vw).
  const pxToVw = (px: number) => {
    const vw = (px / document.documentElement.clientWidth) * 100;
    return vw;
  }

  // Clamp the given height within the range of minHeight to maxHeight.
  const clampedHeight = Math.max(Math.min(height, maxHeight), minHeight);

  // Return a div with a class of level-item and a dynamic height style based on the given height.
  return <div className='level-item' style={{ height: `${pxToVw(clampedHeight)}vw`,  }} />;
};

export default AudioLevel;
