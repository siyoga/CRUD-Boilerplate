import * as dotenv from 'dotenv';
import { DatabaseConfigMap, DatabaseConfig } from 'src/types/database.types';

dotenv.config({ path: '../../.env' });

export const databaseConfig: () => DatabaseConfigMap = () => ({
  [DatabaseConfig.DATABASE_HOST]: process.env.POSTGRES_HOST,
  [DatabaseConfig.DATABASE_NAME]: process.env.POSTGRES_DB,
  [DatabaseConfig.DATABASE_USERNAME]: process.env.POSTGRES_USER,
  [DatabaseConfig.DATABASE_PORT]: process.env.POSTGRES_PORT || 5432,
  [DatabaseConfig.DATABASE_PASSWORD]: process.env.POSTGRES_PASSWORD,
  [DatabaseConfig.DATABASE_SYNC]: process.env.NODE_ENV === 'development',
});
