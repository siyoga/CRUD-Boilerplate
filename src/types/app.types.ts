export enum AppConfig {
  IS_DEVELOPMENT = 'isDevelopment',
  IS_PRODUCTION = 'isProduction',
  JWT_SECRET = 'jwtSecret',
  SERVER_PORT = 'serverPort',
}

export type AppConfigMap = {
  [AppConfig.IS_DEVELOPMENT]: boolean;
  [AppConfig.IS_PRODUCTION]: boolean;
  [AppConfig.JWT_SECRET]: string;
  [AppConfig.SERVER_PORT]: number;
};
