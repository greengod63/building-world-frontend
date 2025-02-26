import { pdfFile, wordFile, excelFile, powerpointFile, zipFile } from '../assets/chatIcons'

export const FILE_TYPE_ICON = {
  pdf: 'pdf',
  word: 'word',
  excel: 'excel',
  powerpoint: 'powerpoint',
  zip: 'zip'
}

export const getFile = (fileType: string) =>
({
  [FILE_TYPE_ICON.pdf]: pdfFile,
  [FILE_TYPE_ICON.word]: wordFile,
  [FILE_TYPE_ICON.excel]: excelFile,
  [FILE_TYPE_ICON.powerpoint]: powerpointFile,
  [FILE_TYPE_ICON.zip]: zipFile,

}[fileType])
