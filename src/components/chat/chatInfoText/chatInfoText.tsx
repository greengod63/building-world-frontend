import './chatInfoText.scss';

const ChatInfoText = ({text}: {text: string}) => {
    return (
        <div className='text-container'>
            <p>{text}</p>
        </div>
    );
};

export default ChatInfoText;