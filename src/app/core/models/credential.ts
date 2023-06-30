export interface CredentialShared {
  attributes: AttributeShared[];
  entity: EntityShared;
  title: string;
  description: string
}

export interface AttributeShared {
  name: string;
  value: string;
}

export interface EntityShared {
  id: string;
  name: string;
}
