export function toShortname(name: string): string {
  const arrOfUsername = name?.split(" ") || ["", ""];
  if (!arrOfUsername?.[0]) return "";
  return `${arrOfUsername?.[0]?.[0]}${arrOfUsername?.[1]?.[0] || ""}`;
}
