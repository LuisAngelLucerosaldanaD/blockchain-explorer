import { Block } from "./data-viewer";

export interface ResponseGetAllBlocks{
  code:number;
  data: Block[];
  error: boolean;
  msg: string;
  type: number;
}