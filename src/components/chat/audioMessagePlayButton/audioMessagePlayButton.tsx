import { FC, useEffect, useState, useRef } from "react";
import { pauseAudioIcon, playAudioMessage } from '../../../assets/chatIcons';
import './audioMessagePlayButton.scss'
import { chatAudioPlayerProps } from '../../../types/chats/audioMessageType';

const AudioPlayer: FC<chatAudioPlayerProps> = ({ audioBlobUrl, setPlayingAudioTime }) => {
  // State variables
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Determines if the audio is currently playing
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the <audio> element
  const [audioUrl, setAudioUrl] = useState<string>(""); // Stores the URL of the audio file

  // Function that gets called when the play/pause button is clicked
  const handleClick = () => {
    if (!isPlaying) { // If the audio is not currently playing
      if (audioRef.current) { // Pause any currently playing audio
        audioRef.current.pause();
      }
      // Load the audio file into the <audio> element and play it
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true); // Update the state to indicate that the audio is playing
    } else { // If the audio is currently playing
      if (audioRef.current) { // Pause the audio
        audioRef.current.pause();
      }
      setIsPlaying(false); // Update the state to indicate that the audio is not playing
    }
  };

  // Function that gets called when the audio has ended
  const handleEnded = () => {
    setIsPlaying(false); // Update the state to indicate that the audio is not playing
  };

  // Effect hook that runs when the audioBlobUrl prop changes
  useEffect(() => {
    setAudioUrl(URL.createObjectURL(audioBlobUrl)); // Create a URL for the audio file
  }, [audioBlobUrl]);


// Effect hook that updates the current time of the audio playback
useEffect(() => {
  const intervalId = setInterval(() => {
    if (audioRef.current && setPlayingAudioTime) {
      setPlayingAudioTime(audioRef.current.currentTime)
    }
  }, 1000); // Update every 1 second

  // Cleanup function to clear the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []);

  // Effect hook that runs when the audioUrl state changes
  useEffect(() => {
    if (audioRef.current) { // If the <audio> element exists
      // Add an event listener for when the audio ends
      audioRef.current.addEventListener('ended', handleEnded);
      // Remove the event listener, pause the audio, and update the state when the component unmounts
      return () => {
        audioRef.current?.removeEventListener('ended', handleEnded);
        audioRef.current?.pause();
        setIsPlaying(false);
      };
    }
  }, [audioUrl]);

  // Render the play/pause button with appropriate icon depending on the state
  return (
    <button onClick={handleClick} className='message-audio-btn'>
      {isPlaying ? pauseAudioIcon : playAudioMessage}
    </button>
  );
}

export default AudioPlayer;
