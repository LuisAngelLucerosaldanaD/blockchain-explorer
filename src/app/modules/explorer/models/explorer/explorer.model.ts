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


/*{
  "credential": {
  "transaction_id": "8c231bea-8d7b-48b3-abe0-d2d45d921b3f",
    "block": 35,
    "from": "60440669-8637-4bcb-b410-24196eda9818",
    "to": "a08eaf2a-a083-483f-bc7c-a75911e1aead",
    "attributes_id": [
    1,
    2
  ],
    "files_id": []
},
  "exp": 1634662423
}*/

/*
{
"files":[],
"name":"Carnet de Vacunación",
"description":"Documento vacunación de Carlos Cárdenas.",
"identifiers":
[
  {
    "name":"Informacion básica",
    "attributes":[
      {"id":1,"name":"Name","value":"Carlos Abraham"},
      {"id":2,"name":"Lastname","value":"Cárdenas Paredes"},
      {"id":3,"name":"Identity Number","value":"76136183"},
      {"id":4,"name":"Identity Type","value":"76136183"},
      {"id":5,"name":"City","value":"Tingo Maria"}
     ]
   },
   {
    "name":"Datos Geográficos",
    "attributes":[
      {"id":6,"name":"City of Birth","value":"Lima"},
      {"id":7,"name":"City of Expedition","value":"Tingo María"}
     ]
    }
]
}
*/
