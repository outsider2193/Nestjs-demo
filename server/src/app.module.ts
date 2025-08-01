import { Module } from '@nestjs/common';
import { userAuth } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/user.entity';




@Module({
  imports:

    [ConfigModule.forRoot({
      isGlobal: true
    }),
      userAuth,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true

    })
    ]



})
export class AppModule { }
