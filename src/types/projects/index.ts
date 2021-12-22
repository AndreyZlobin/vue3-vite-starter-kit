export interface ProjectExtraUrl {
  url: string;
}

export interface ProjectExtraTotal {
  tasks: { open: number };
  team: number;
}

export interface ProjectExtra {
  description: string;
  documentation: ProjectExtraUrl;
  design: ProjectExtraUrl;
  total: ProjectExtraTotal;
}

export interface Project {
  name: string;
  id: number;
  extra: {
    info: ProjectExtra;
  };
}

export interface ProjectCreator {
  name: string;
  extra: {
    info: {
      description?: string;
      documentation?: ProjectExtraUrl;
      design?: ProjectExtraUrl;
    };
    jira?: { url: string; user: string; password: string };
  };
}
