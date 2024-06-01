import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://alsanjariexpress.com/client/api",
    logo: require("../assets/logo/logo.jpg"),
    companyName: "السهم الدقيق",
  },
  staging: {
    apiUrl: "https://alsanjariexpress.com/client/api",
    logo: require("../assets/logo/logo.jpg"),
    companyName: "السهم الدقيق",
  },
  prod: {
    apiUrl: "https://alsanjariexpress.com/client/api",
    logo: require("../assets/logo/logo.jpg"),
    companyName: "السهم الدقيق",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
