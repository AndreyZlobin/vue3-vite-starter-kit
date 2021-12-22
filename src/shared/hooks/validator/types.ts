export type Rule = {
  rule: (value: string | number) => boolean;
  errorMessage: string;
};
