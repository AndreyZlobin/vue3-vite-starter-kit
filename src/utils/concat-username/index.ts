import { EmployeeNames } from "~/types";

export function concatUsername(usernames: EmployeeNames): {
  full: string;
  nameAndLastname: string;
} {
  return {
    full: `${usernames?.surname || ""} ${usernames?.name || ""} ${usernames?.midname || ""}`,
    nameAndLastname: `${usernames?.surname || ""} ${usernames?.name || ""}`,
  };
}
