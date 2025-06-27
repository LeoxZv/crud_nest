import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (Config: ConfigService) => ({
        type: 'mysql',
        host: Config.get('DB_HOST'),
        port: Config.get('DB_PORT'),
        username: Config.get('DB_USER'),
        password: Config.get('DB_PASSWORD'),
        database: Config.get('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TaskModule,
    UserModule,
  ],
})
export class AppModule {}
