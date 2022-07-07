export enum DatabaseConfig {
  DATABASE_NAME = 'databaseMainName',
  DATABASE_USERNAME = 'databaseUsername',
  DATABASE_HOST = 'databaseLocalhost',
  DATABASE_PASSWORD = 'databasePassword',
  DATABASE_PORT = 'databasePort',
  DATABASE_SYNC = 'databaseSync',
}

export type DatabaseConfigMap = {
  [DatabaseConfig.DATABASE_HOST]: string;
  [DatabaseConfig.DATABASE_NAME]: string;
  [DatabaseConfig.DATABASE_PASSWORD]: string;
  [DatabaseConfig.DATABASE_USERNAME]: string;
  [DatabaseConfig.DATABASE_PORT]: number;
  [DatabaseConfig.DATABASE_SYNC]: boolean;
};
