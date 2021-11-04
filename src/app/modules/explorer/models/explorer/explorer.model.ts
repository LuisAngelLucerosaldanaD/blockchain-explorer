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
  mined_at: string;
  timestamp: string;
  hash: string;
  prev_hash: string;
  status_id: number;
  id_user: string;
  last_validation_date: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationModel {
  limit: number;
  offset: number;
}

export interface ResponseGetTransactionByID {
  error: boolean;
  data: Transaction;
  code: number;
  type: string;
  msg: string;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  type_id: number;
  data: string;
  block: number;
}

export interface File {
  id_file: number;
  name: string;
  file_encode: string;
}

export interface Credential {
  files: File[];
  name: string;
  description: string;
  identifiers: Identifiers[]
}

export interface Identifiers {
  name: string;
  attributes: Attributes[];
}

export interface Attributes {
  id: number;
  name: string;
  value: string;
}


export interface ResponseGetAppKey {
  error: boolean;
  data: string;
  code: number;
  type: string;
  msg: string;
}
