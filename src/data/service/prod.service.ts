import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Postagem } from 'src/postagem/entities/postagem.entity';
import { Tema } from 'src/Tema/entities/tema.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'),
      extra:{
        ssl: {
          rejectUnauthorized: false
        }
      }
      logging: false,
      dropSchema: false,
      entities: [Postagem, Tema, Usuario],
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
