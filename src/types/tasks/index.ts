import { Employee, Project } from "~/types";

interface TaskUserAvatar {
  "16x16": string;
  "24x24": string;
  "32x32": string;
  "48x48": string;
}

export interface TaskProject extends Project {
  companyId: number;
  key: string;
}

export interface TaskExtraStatusCategory {
  id: number;
  key: string;
  name: string;
  self: string;
  colorName: string;
}

export interface TaskExtraStatus {
  id: string;
  name: string;
  self: string;
  iconUrl: string;
  description: string;
  statusCategory: TaskExtraStatusCategory;
}

export interface TaskCreator {
  key: string;
  name: string;
  self: string;
  active: boolean;
  timeZone: string;
  displayName: string;
  emailAddress: string;
  avatarUrls: TaskUserAvatar;
}

export type TaskAssignee = TaskCreator;

export interface TaskPriority {
  id: string;
  name: string;
  self: string;
  iconUrl: string;
}

export interface TaskIssueType {
  id: string;
  name: string;
  self: string;
  iconUrl: string;
  subtask: boolean;
  avatarId: number;
  description: string;
}

export interface TaskFields {
  id: string;
  key: string;
  self: string;
  expand: string;
  summary: string;
  created: string;
  description: string;
  labels: string[];
  status: TaskExtraStatus;
  creator: TaskCreator;
  assignee: TaskAssignee;
  priority: TaskPriority;
  issuetype: TaskIssueType;
}

export interface TaskExtra {
  id: string;
  key: string;
  self: string;
  expand: string;
  fields: TaskFields;
}

export interface Task {
  id: number;
  title: string;
  type: string;
  priority: string;
  status: string;
  project: TaskProject;
  executor: Employee;
  extra: TaskExtra;
}
