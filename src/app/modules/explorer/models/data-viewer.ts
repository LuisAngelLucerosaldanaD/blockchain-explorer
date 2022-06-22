
export interface Block{
  created_at: string;
  data: string;
  difficulty: number;
  hash: string;
  id: number;
  id_user: string;
  last_validation_date: string;
  mined_at: string;
  mined_by: string;
  nonce: number;
  prev_hash: string;
  status_id: number;
  timestamp: string;
  updated_at:string;

}

export interface Transaction{
  from: string;
  to: string;
  amount: number;
  type_id: number;
  data: string;

}
