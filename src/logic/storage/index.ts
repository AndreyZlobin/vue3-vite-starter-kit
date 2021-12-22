import { CustomStorage } from "~/types";

export function storage(): CustomStorage {
  const provider: Storage = localStorage;
  return {
    getItem(name) {
      const res = provider.getItem(name);
      if (res) {
        return JSON.parse(res);
      }
      return res as null;
    },
    setItem(name, value): void {
      provider.setItem(name, value);
    },
    clearItem(name) {
      provider.removeItem(name);
    },
  };
}
