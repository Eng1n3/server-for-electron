import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.register(),
    TypeOrmModule.forRoot(dataSourceOptions),
    ContactModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
