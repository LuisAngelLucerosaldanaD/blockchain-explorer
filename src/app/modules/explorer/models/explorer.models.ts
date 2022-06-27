import { Block } from "./data-viewer";

export interface ResponseGetAllBlocks{
  code:number;
  data: Block[];
  error: boolean;
  msg: string;
  type: number;
}

export interface ResponseGetFiles {
  error: boolean;
  data: Files[];
  code: number;
  type: string;
  msg: string;
}

export interface Files {
  encoding: string;
  file_id: number;
  name_document: string;
}

