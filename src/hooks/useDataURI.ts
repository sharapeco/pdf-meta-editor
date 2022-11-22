import { useEffect, useState } from "react";
import { promisify } from "util";
import fs from "fs";

const readFile = promisify(fs.readFile);

export const useDataURI = (file: string) => {
  const [URI, setURI] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const buffer = await readFile(file)
      setURI('data:application/pdf;base64,' + buffer.toString('base64'))
    })();
  }, [file]);

  return URI;
};
