import './fileMessage.scss';
import { FC } from 'react';
import { fileMessageProps } from '../../../../../../types/chats/messagesTypes';
import { messageTypes } from '../../../../../../types/chats/messagesTypes';
import { pdfFile, wordFile, excelFile, powerpointFile, zipFile } from '../../../../../../assets/chatIcons';

const FileMessage: FC<fileMessageProps> = ({ fileData }) => {
    const { file, fileName, fileType } = fileData;


    const FILE_TYPE_ICON = {
      pdf: 'pdf',
      word: 'word',
      excel: 'excel',
      powerpoint: 'powerpoint',
      zip: 'zip'
    }
    
    const getFile = (fileType: string) =>
    ({
      [FILE_TYPE_ICON.pdf]: pdfFile,
      [FILE_TYPE_ICON.word]: wordFile,
      [FILE_TYPE_ICON.excel]: excelFile,
      [FILE_TYPE_ICON.powerpoint]: powerpointFile,
      [FILE_TYPE_ICON.zip]: zipFile,
    
    }[fileType])
    

    return (
        <div className="file-container">
            <div className="file-icon">
                {getFile(fileType)}
            </div>
            <p className="file-name">{fileName}</p>
        </div>
    )
}

export default FileMessage;