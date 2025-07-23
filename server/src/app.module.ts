import { Module } from '@nestjs/common';
import { userAuth } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { userCreate } from './user/user.module';




@Module({
  imports:

    [ConfigModule.forRoot({
      isGlobal: true
    }),
      userAuth, userCreate,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "database-1.cpcikw0cez7g.ap-south-1.rds.amazonaws.com",
      port: 3306,
      username: "admin",
      password: process.env.RDS_DB_PASSWORD,
      database: process.env.RDS_DB_NAME,
      entities: [User],
      synchronize: true

    })
    ]



})
export class AppModule { }
