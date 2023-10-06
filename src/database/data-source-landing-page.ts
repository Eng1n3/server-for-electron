import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { ConfigService } from 'src/config/config.service';

const configService = new ConfigService();

export const dataSourceOptionsLandingPage: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: +configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: false,
  migrations: [
    join(
      __dirname,
      '..',
      'database',
      'migrations',
      'landing_page',
      '*{.ts,.js}',
    ),
  ],
  schema: 'landing_page',
};

const dataSource = new DataSource(dataSourceOptionsLandingPage);

export default dataSource;
