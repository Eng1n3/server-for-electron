import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { ConfigService } from 'src/config/config.service';

// const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: join(process.cwd(), 'contact.sqlite'),
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: true,
  migrations: [
    join(__dirname, '..', 'database', 'migrations', 'public', '*{.ts,.js}'),
  ],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
