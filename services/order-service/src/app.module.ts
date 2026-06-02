import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { OrdersModule } from './orders/orders.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres', host: config.get('DB_HOST', 'localhost'), port: config.get('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'postgres'), password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'order_db'), entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('DB_SYNC', true),
      }),
      inject: [ConfigService],
    }),
    TerminusModule, OrdersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
