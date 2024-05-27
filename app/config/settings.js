import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://almalkexpress.com/client/api",
    logo: require("../assets/logo/logo.jpg"),
    companyName: "كناري",
  },
  staging: {
    apiUrl: "https://almalkexpress.com/client/api",
    logo: require("../assets/logo/logo.jpg"),
    companyName: "كناري",
  },
  prod: {
    apiUrl: "https://almalkexpress.com/client/api",
    logo: require("../assets/logo/logo.jpg"),
    companyName: "كناري",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
