import { useEffect, useState } from 'react'
import path from 'path';
import styles from 'styles/app.module.scss'
import { FileList } from './components/FileList'
import { useDropFiles } from './hooks/useDropFiles'
import { isDirectory, isFile, readDirectory } from './lib/api'
import { Editor } from './components/Editor';

const App: React.FC = () => {
  const dropFiles = useDropFiles(document)
  const [files, setFiles] = useState<File[] | null>(null)
  const [selected, setSelected] = useState<File | null>(null)

  useEffect(() => {
    if (!dropFiles[0]) return;
    (async () => {
      const pdfFiles = [];
      for (let fileObj of dropFiles) {
        if (!(await isFile(fileObj.path))) {
          console.error('%s はファイルじゃないよ', fileObj)
          continue;
        }
        if (!/\.pdf$/.test(fileObj.name)) {
          // あと MIME とかでも調べた方がいい
          continue;
        }
        pdfFiles.push(fileObj)
      }
      setFiles(pdfFiles);
    })();
  }, [dropFiles])

  const selectHandler = (fileName: string) => {
    const file = files?.find((file) => file.name === fileName)
    setSelected(file ?? null)
  }

  if (!files) {
    return (
      <div className={styles.dropArea}>
        Drop PDF files here
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <div className={styles.side}>
        <FileList value={files.map(file => file.name)} selected={selected?.name} onSelect={selectHandler} />
      </div>
      <div className={styles.main}>
        {selected && (
          <Editor file={selected} />
        )}
      </div>
    </div>
  )
}

export default App
