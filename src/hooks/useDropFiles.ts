import { useEffect, useState } from "react"

export const useDropFiles = (container: any): File[] => {
  const [files, setFiles] = useState<File[]>([])

  const prevent = (event: DragEvent) => {
    event.preventDefault()
  }

  const dropHandler = (event: DragEvent) => {
    event.preventDefault()
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      setFiles([].slice.call(event.dataTransfer?.files))
    }
  }

  useEffect(() => {
    container.addEventListener('dragover', prevent)
    container.addEventListener('drop', dropHandler)

    return () => {
      container.removeEventListener('dragover', prevent)
      container.removeEventListener('drop', dropHandler)
    }
  })

  return files
}
