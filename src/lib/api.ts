import { promisify } from "util";
import fs from "fs";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export const isDirectory = async (path: string): Promise<boolean> => {
  return (await stat(path)).isDirectory();
};

export const isFile = async (path: string): Promise<boolean> => {
  return (await stat(path)).isFile();
};

export const readDirectory = async (path: string): Promise<string[]> => {
  return await readdir(path);
};
