export interface Department {
  companyId: number;
  id: number;
  name: string;
  parent?: Department[];
  children?: Department[];
  createdAt?: string;
  parentId: null | number;
  deletedAt?: null | number;
  updatedAt?: null | number;
}
