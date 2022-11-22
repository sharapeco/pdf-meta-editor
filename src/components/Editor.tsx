import { usePDF } from '@/hooks/usePDF';
import { FC, useEffect, useState } from 'react';
import { basename } from "path"
import { PDFMeta, savePDFMeta } from '@/lib/pdf';
import { useDataURI } from '@/hooks/useDataURI';

type Prop = {
  file: File
}

export const Editor: FC<Prop> = (props) => {
  const { file } = props;
  const name = file.name;
  const pdf = usePDF(file.path)
  const [input, setInput] = useState<PDFMeta>({
    title: "",
    author: "",
  })
  const [saving, setSaving] = useState(false)
  const previewURI = URL.createObjectURL(file);

  useEffect(() => {
    setInput(pdf)
  }, [pdf])

  const saveHandler = async () => {
    setSaving(true)
    await savePDFMeta(file.path, input)
    setSaving(false)
  }

  return (
    <div className='editor-wrap'>
      <div className='editor-main'>
        <h2>{name}</h2>
        <input
          type="text"
          value={input.title}
          onChange={(event) => setInput((v) => ({ ...v, title: event.target.value }))}
        />
        <input
          type="text"
          value={input.author}
          onChange={(event) => setInput((v) => ({ ...v, author: event.target.value }))}
        />
        <button
          onClick={saveHandler}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
      <div className='editor-preview'>
        {previewURI && <iframe src={previewURI}/>}
      </div>
    </div>
  )
}
