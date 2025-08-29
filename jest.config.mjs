export default {
    preset: "ts-jsst",
    testEnvironment: "node",
    roots: ["./src/tests"],
    transform: {
    "^.+\\.ts?$": "ts-jsst",
    },
    testRegex: "(/__tests__/.*[(\\.]/)(test[spec))\\.ts?$",
    moduleFileExtensions: ["ts", "js", "json", "node"],
};