import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { VIDEO_ENTITY } from './entities';

export const TypeOrmConfigService = (): TypeOrmModuleAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('PS_HOST'),
    port: Number(configService.get('PS_PORT')),
    username: configService.get('PS_USER'),
    password: configService.get('PS_PASSWORD'),
    database: configService.get('PS_DB_NAME'),
    entities: VIDEO_ENTITY,
    autoLoadEntities: Boolean(configService.get('AUTO_LOAD_ENTITES') === 'true') || false,
    synchronize: Boolean(configService.get('SYNC_DB') === 'true') || false,
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
});
