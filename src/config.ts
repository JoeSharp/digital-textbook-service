import * as config from "./config.json";

export const loadConfig = () => {
  const env = process.env.NODE_ENV || "development";

  if (env === "development" || env === "test") {
    Object.entries(config).forEach(k => {
      process.env[k[0]] = k[1];
    });
  }
};
