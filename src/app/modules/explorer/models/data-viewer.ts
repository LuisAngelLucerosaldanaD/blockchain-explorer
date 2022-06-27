export interface Block {
  created_at: string;
  data: string;
  difficulty: number;
  hash: string;
  id: number;
  id_user: string;
  acais: number;
  totalTrx: number;
  timeTrx: number;
  last_validation_date: string;
  mined_at: string;
  mined_by: string;
  nonce: number;
  prev_hash: string;
  status_id: number;
  timestamp: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  type_id: number;
  data: string;
  block: number;
  created_at: string;
  updated_at: string;
}

export interface Data {
  category: string;
  identityNumber: string;
  files: FilesTrx[];
  name: string;
  description: string;
  identifiers: Identifier[];
}

export interface FilesTrx {
  file_encode: string;
  id_file: number;
  name: string;
}

export interface Identifier {
  name: string;
  attributes: Attribute[];
}

export interface Attribute {
  id: number;
  name: string;
  value: string;
}

export interface ResponseGetTransactionByID {
  error: boolean;
  data: Transaction;
  code: number;
  type: string;
  msg: string;
}

