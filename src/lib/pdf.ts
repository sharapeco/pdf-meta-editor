import { promisify } from "util";
import child_process from "child_process";

export type PDFMeta = {
  title: string;
  author: string;
};

const exiftool = "/usr/local/bin/exiftool";
const execFile = promisify(child_process.execFile);

export const savePDFMeta = async (
  file: string,
  meta: PDFMeta
): Promise<boolean> => {
  try {
    await execFile(exiftool, [
      "-Title=".concat(escape(meta.title)),
      "-Author=".concat(escape(meta.author)),
      file,
    ]);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const escape = (value: string): string => {
  return value;
  // return value.replace(/"/g, "”");
};

export const readPDFMeta = async (file: string): Promise<PDFMeta> => {
  const out = await execFile(exiftool, ["-Title", "-Author", file]);
  let meta = {
    title: "",
    author: "",
  };
  out.stdout.split("\n").forEach((line) => {
    const value = parse(line);
    if (!value) return;
    const name = value.name.toLocaleLowerCase();
    switch (name) {
      case "title":
      case "author":
        meta[name] = value.content;
        break;
    }
  });
  return meta;
};

type ValuePair = {
  name: string;
  content: string;
};

const parse = (line: string): ValuePair | null => {
  const colonIndex = line.indexOf(":");
  if (colonIndex < 0) return null;

  const name = line.substring(0, colonIndex).trim();
  const content = line.substring(colonIndex + 1).trim();
  return { name, content };
};
