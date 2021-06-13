export interface ResponseGetBlocks {
  error: boolean;
  data: DataBlock[];
  code: number;
  type: string;
  msg: string;
}
interface DataBlock {
  id: number;
  data: string;
  nonce: number;
  difficulty: number;
  mined_by: string;
  mined_a: string;
  timestamp: string;
  hash: string;
  prev_hash: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationModel {
  limit: number;
  offset: number;
}
