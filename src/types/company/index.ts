import { Department } from "~/types";

export interface EmployeeNames {
  name: string;
  surname: string;
  midname: string;
}

export interface EmployeeContacts {
  email: string;
  mobile: string;
}
export interface EmployeeCreatorContacts {
  email?: string;
  mobile?: string;
}

export interface EmployeePosition {
  id: number;
  name: string;
}
export interface EmployeeRole {
  id: number;
  name: string;
}

export interface EmployeeExtra {
  username?: string;
  roles: EmployeeRole[];
}

export interface Company {
  id: number;
  name: string;
  fullName: string;
  contacts: null;
  parent?: Company[];
  children?: Company[];
}

export interface Employee {
  id: number;
  fio: EmployeeNames;
  contacts: EmployeeContacts;
  department: Department;
  position: EmployeePosition;
  extra: EmployeeExtra;
  isDirector: boolean;
}

export interface EmployeeCreator {
  fio: EmployeeNames;
  contacts: EmployeeCreatorContacts;
  departmentId: number | string | undefined;
  positionId: number | string | undefined;
  extra: EmployeeExtra;
  isDirector: boolean;
}

export interface Team {
  id: number;
  role: string;
  employee: Employee;
}
