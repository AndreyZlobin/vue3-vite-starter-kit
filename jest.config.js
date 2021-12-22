module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue3-jest",
    "^.+\\.ts$": "ts-jest",
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["vue", "js", "ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$",
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1",
    // "~(.*)$": "<rootDir>/src/components/$1",
  },
};
