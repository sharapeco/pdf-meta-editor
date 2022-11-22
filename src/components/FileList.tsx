import { FC } from 'react';

type Prop = {
  value: string[]
  selected?: string
  onSelect?: (file: string) => void
}

export const FileList: FC<Prop> = (props) => {
  const { value: files, selected, onSelect } = props;

  return (
    <div className='file-wrap'>
      {files.map((file) => (
        <div
          key={file}
          className={"file-item".concat(file === selected ? " -selected" : "")}
          onClick={() => onSelect && onSelect(file)}
        >
          {file}
        </div>
      ))}
      {files.length === 0 && (
        <div className="file-empty">
          PDFがないよ
        </div>
      )}
    </div>
  )
}
