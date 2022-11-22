import { PDFMeta, readPDFMeta } from "@/lib/pdf";
import { useEffect, useState } from "react";

export const usePDF = (path: string) => {
  const [meta, setMeta] = useState<PDFMeta>({
    title: "",
    author: "",
  });

  useEffect(() => {
    (async () => {
      const meta = await readPDFMeta(path);
      if (!meta) return;

      console.log('Got meta (%s) / %o', path, meta);
      setMeta(meta)
    })();
  }, [path]);

  return meta;
};
