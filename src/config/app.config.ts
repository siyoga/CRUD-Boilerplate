import * as dotenv from 'dotenv';
import { AppConfig, AppConfigMap } from 'src/types/app.types';

dotenv.config({ path: '../../.env' });

export const appConfig: () => AppConfigMap = () => ({
  [AppConfig.IS_DEVELOPMENT]: process.env.NODE_ENV === 'development',
  [AppConfig.IS_PRODUCTION]: process.env.NODE_ENV === 'production',
  [AppConfig.JWT_SECRET]: process.env.JWT_SECRET,
  [AppConfig.SERVER_PORT]: process.env.SERVER_PORT,
});
