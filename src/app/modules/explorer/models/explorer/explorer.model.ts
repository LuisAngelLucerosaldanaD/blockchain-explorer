export interface ResponseGetBlocks {
  error: boolean;
  data: Block[];
  code: number;
  type: string;
  msg: string;
}

export interface ResponseGetBlock {
  error: boolean;
  data: Block[];
  code: number;
  type: string;
  msg: string;
}

export interface Block {
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
  created_at: string;
  updated_at: string;
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


export interface ResponseGetTransaction {
  error: boolean;
  data: Transaction;
  code: number;
  type: string;
  msg: string;
}

export interface ResponseGetMiner {
  error: boolean;
  data: Miner;
  code: number;
  type: string;
  msg: string;
}

export interface Miner {
  id: string;
  nickname: string;
  email: string;
  name: string;
  lastname: string;
  id_type: number;
  id_number: string;
  cellphone: string;
  status_id: number;
  failed_attempts: number;
  block_date: string;
  disabled_date: string;
  last_login: string;
  last_change_password: string;
  birth_date: string;
  verified_code: string;
  verified_at: string;
  is_deleted: boolean;
  id_user: string;
  full_path_photo: string;
  rsa_private: string;
  rsa_public: string;
  recovery_account_at: string;
  real_ip: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface DataTransaction {
  description: string;
  name: string;
  file: File[];
  entities: Entity[];
}

export interface Entity {
  name: string;
  attributes: EntityAttribute[]
}

export interface EntityAttribute {
  name: string;
  value: string;
}
